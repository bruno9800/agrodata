import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  bestPriceId: number;
}
