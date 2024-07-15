import { IsString, MinLength, IsIn, IsDate, IsUrl } from 'class-validator';
import { Plan, Prisma } from '@prisma/client';

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
