import { Plan, Prisma } from '@prisma/client';
import { IsDate, IsIn, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateProfileDto implements Prisma.ProfileCreateWithoutUserInput {
  @IsUrl()
  avatarUrl?: string;

  @IsString()
  @MinLength(3)
  name?: string;

  @IsIn(['FREE', 'PREMIUM'])
  plan?: Plan;

  @IsDate()
  birthdate?: string;
}
