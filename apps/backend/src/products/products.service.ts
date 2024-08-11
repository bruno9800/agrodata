import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SafrasService } from 'src/safras/safras.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly safra: SafrasService,
  ) {}
  async create(createProductDto: CreateProductDto, userId: string) {
    const name = createProductDto.name
      .trim()
      .toLowerCase()
      .replaceAll(' ', '-');
    const productAlreadyExists = await this.prisma.product.findFirst({
      where: { name },
    });

    if (productAlreadyExists)
      throw new ConflictException('This product already exists');

    await this.safra.findOne(createProductDto.safraId, userId);

    const product = await this.prisma.product.create({
      data: {
        name,
        safraId: createProductDto.safraId,
      },
    });

    return product;
  }

  async findAll(safraId: number, userId: string) {
    await this.safra.findOne(safraId, userId);

    const products = await this.prisma.product.findMany({
      where: { safraId },
    });
    if (!products) {
      throw new HttpException(
        'não foi possível listar os produtos',
        HttpStatus.NOT_FOUND,
      );
    }
    return products;
  }

  async findOne(name: string, safraId: number) {
    const product = await this.prisma.product.findFirst({
      where: {
        name,
        safraId,
      },
      include: {
        BuyProduct: true,
      },
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findById(id);

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

  async remove(id: number) {
    await this.findById(id);

    const removedProduct = await this.prisma.product.delete({
      where: { id },
    });
    if (!removedProduct) {
      throw new HttpException('Product not removed', HttpStatus.NOT_MODIFIED);
    }
    return removedProduct;
  }
}