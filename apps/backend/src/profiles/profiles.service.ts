import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UserService,
  ) {}

  async create(createProfileDto: CreateProfileDto, userId: string) {
    const user = await this.user.findById(userId);
    if (!user) {
      throw new Error('User not found!');
    }

    const profile = await this.prisma.profile.create({
      data: {
        ...createProfileDto,
        userId,
      },
    });
    return profile;
  }

  async findAll() {
    return this.prisma.profile.findMany();
  }

  async findById(id: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id,
      },
    });
    return profile;
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.user.findById(userId);
    if (!user) {
      throw new Error('User not found!');
    }
    const profile = this.prisma.profile.update({
      where: {
        id: user.Profile.id,
      },
      data: {
        ...updateProfileDto,
      },
    });
    return profile;
  }
}
