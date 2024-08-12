import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto, userId: string) {
    const name = createProductDto.name
      .trim()
      .toLowerCase()
      .replaceAll(' ', '-');
    const productAlreadyExists = await this.prisma.product.findFirst({
      where: { name, userId },
    });

    if (productAlreadyExists)
      throw new ConflictException('This product already exists');

    const product = await this.prisma.product.create({
      data: {
        name,
        userId,
      },
    });

    return product;
  }

  async findAll(userId: string) {
    const products = await this.prisma.product.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        bestPriceId: true,
        BuyProduct: {
          orderBy: {
            price: 'asc',
          },
          take: 1,
          select: {
            price: true,
            store: true,
            createdAt: true,
            quantity: true,
          },
        },
      },
    });
    if (!products) {
      throw new HttpException(
        'não foi possível listar os produtos',
        HttpStatus.NOT_FOUND,
      );
    }

    return products;
  }

  async findOne(name: string, userId: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        name,
        userId,
      },
      include: {
        BuyProduct: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async findById(id: number, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');

    if (product.userId !== userId)
      throw new UnauthorizedException(
        'Unauthorized! This user is not the owner of this product',
      );

    return product;
  }

  async updateBestPrice(id: number) {
    const [currentBestBuy] = await this.prisma.buyProduct.findMany({
      where: {
        productId: id,
      },
      include: { product: true },
      orderBy: { price: 'asc' },
      take: 1,
    });

    console.log(currentBestBuy);

    if (!currentBestBuy) throw new NotFoundException('Buys not exists');

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        bestPriceId: currentBestBuy.id,
      },
    });

    return updatedProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto, userId: string) {
    await this.findById(id, userId);

    await this.findOne(updateProductDto.name, userId);

    if (updateProductDto.bestPriceId) {
      const bestBuy = await this.prisma.buyProduct.findUnique({
        where: { id: updateProductDto.bestPriceId },
      });
      if (!bestBuy)
        throw new NotFoundException('Não foi possivel encontrar essa compra');
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        ...updateProductDto,
      },
    });
    if (!updatedProduct) {
      throw new HttpException('Product not updated', HttpStatus.NOT_MODIFIED);
    }
    return updatedProduct;
  }

  async remove(id: number, userId: string) {
    await this.findById(id, userId);

    const removedProduct = await this.prisma.product.delete({
      where: { id },
    });
    if (!removedProduct) {
      throw new HttpException('Product not removed', HttpStatus.NOT_MODIFIED);
    }
    return removedProduct;
  }
}
