import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SafrasModule } from 'src/safras/safras.module';

@Module({
  imports: [PrismaModule, SafrasModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
