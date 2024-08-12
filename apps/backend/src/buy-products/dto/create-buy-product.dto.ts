import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBuyProductDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  store?: string;

  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
