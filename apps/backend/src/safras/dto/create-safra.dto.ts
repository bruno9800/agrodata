import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateSafraDto {
  @IsString()
  @IsNotEmpty()
  culture: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  squareArea?: number;

  @IsNumber()
  @IsOptional()
  quantityPlanted?: number;
}

/**
 * model Safra {
  culture         String
  name            String?
  squareArea      Float?
  quantityPlanted Int?


  userId  String
}
 */
