import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBuyProductDto {
  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  store?: string;
}
