import { Module } from '@nestjs/common';
import { BuyProductsService } from './buy-products.service';
import { BuyProductsController } from './buy-products.controller';
import { SafrasModule } from 'src/safras/safras.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [PrismaModule, SafrasModule, ProductsModule],
  controllers: [BuyProductsController],
  providers: [BuyProductsService],
  exports: [BuyProductsService],
})
export class BuyProductsModule {}
