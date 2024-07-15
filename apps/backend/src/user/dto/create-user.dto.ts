import { IsString, MinLength, IsEmail, ValidateIf } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsEmail()
  email: string;

  @ValidateIf((o) => !o.googleId)
  @IsString()
  @MinLength(6)
  hashedPassword?: string;

  @ValidateIf((o) => !o.hashedPassword)
  @IsString()
  googleId?: string;
}
