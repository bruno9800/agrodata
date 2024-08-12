import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuyProductDto } from './dto/create-buy-product.dto';
import { UpdateBuyProductDto } from './dto/update-buy-product.dto';
import { SafrasService } from 'src/safras/safras.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class BuyProductsService {
  constructor(
    private readonly safra: SafrasService,
    private readonly prisma: PrismaService,
    private readonly product: ProductsService,
  ) {}
  async create(
    createBuyProductDto: CreateBuyProductDto,
    safraId: number,
    userId: string,
  ) {
    await this.safra.findOne(safraId, userId);

    await this.product.findById(createBuyProductDto.productId, userId);

    const buy = await this.prisma.buyProduct.create({
      data: {
        ...createBuyProductDto,
        safraId,
      },
    });

    await this.product.updateBestPrice(buy.productId);

    return buy;
  }

  async findAll(safraId: number) {
    const buys = await this.prisma.buyProduct.findMany({
      where: {
        safraId,
      },
    });

    return buys;
  }

  async findOne(id: number) {
    const buy = await this.prisma.buyProduct.findUnique({ where: { id } });

    if (!buy) {
      throw new NotFoundException('This buy not exists');
    }

    return buy;
  }

  async update(
    id: number,
    updateBuyProductDto: UpdateBuyProductDto,
    userId: string,
  ) {
    const buyProduct = await this.prisma.buyProduct.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!buyProduct) {
      throw new NotFoundException('this buy not exists');
    }

    await this.product.findById(buyProduct.product.id, userId);
    await this.safra.findOne(buyProduct.safraId, userId);

    const updatedProduct = await this.prisma.buyProduct.update({
      where: { id },
      data: {
        ...updateBuyProductDto,
      },
    });

    await this.product.updateBestPrice(buyProduct.productId);

    return updatedProduct;
  }

  async remove(id: number, userId: string) {
    const buy = await this.findOne(id);

    await this.product.findById(buy.productId, userId);
    await this.safra.findOne(buy.safraId, userId);

    const removedBuy = await this.prisma.buyProduct.delete({
      where: {
        id,
      },
    });

    await this.product.updateBestPrice(buy.productId);
    return removedBuy;
  }
}
