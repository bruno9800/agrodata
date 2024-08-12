import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BuyProductsService } from './buy-products.service';
import { CreateBuyProductDto } from './dto/create-buy-product.dto';
import { UpdateBuyProductDto } from './dto/update-buy-product.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('buy')
export class BuyProductsController {
  constructor(private readonly buyProductsService: BuyProductsService) {}

  @Post(':safraId')
  create(
    @Body() createBuyProductDto: CreateBuyProductDto,
    @Param('safraId') safraId: string,
    @CurrentUser() user,
  ) {
    return this.buyProductsService.create(
      createBuyProductDto,
      +safraId,
      user.id,
    );
  }

  @Get(':safraId')
  findAll(@Param('safraId') safraId: string) {
    return this.buyProductsService.findAll(+safraId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyProductsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBuyProductDto: UpdateBuyProductDto,
    @CurrentUser() user,
  ) {
    return this.buyProductsService.update(+id, updateBuyProductDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user) {
    return this.buyProductsService.remove(+id, user.id);
  }
}
