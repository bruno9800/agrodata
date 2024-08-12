import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @CurrentUser() user) {
    return this.productsService.create(createProductDto, user.id);
  }

  @Get('')
  findAll(@Param('safraId') safraId: string, @CurrentUser() user) {
    return this.productsService.findAll(user.id);
  }

  @Get(':name')
  findOne(@Param('name') name: string, @CurrentUser() user) {
    return this.productsService.findOne(name, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user,
  ) {
    return this.productsService.update(+id, updateProductDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user) {
    return this.productsService.remove(+id, user.id);
  }
}
