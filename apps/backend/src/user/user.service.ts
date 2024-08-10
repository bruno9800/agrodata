import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserNotFoundError } from './erros/user-not-found';
import { DeleteUserError } from './erros/delete-user-error';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
    createProfileDto?: CreateProfileDto,
  ) {
    const user: CreateUserDto = {
      ...createUserDto,
      hashedPassword: await bcrypt.hash(createUserDto.hashedPassword, 10),
    };

    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
        Profile: {
          create: {
            ...createProfileDto,
          },
        },
      },
    });

    return {
      user: createdUser,
    };
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        Profile: {
          select: {
            avatarUrl: true,
            birthdate: true,
            name: true,
            plan: true,
            updatedAt: true,
          },
        },
      },
    });
    return allUsers;
  }

  async findById(id: string) {
    try {
      const userById = await this.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          Profile: true,
        },
      });
      if (!userById) {
        throw new UserNotFoundError();
      }

      return userById;
    } catch (error) {
      if (error instanceof UserNotFoundError) throw error;
      throw new HttpException(
        'Fetching error user!' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      const userById = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!userById) {
        return null;
      }

      return userById;
    } catch (error) {
      if (error instanceof UserNotFoundError) throw error;
      throw new HttpException(
        'Fetching error user!' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  async updatePassword(id: string, updatePassword: UpdatePasswordDto) {
    const { newPassword } = updatePassword;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedPassword,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.prisma.profile.delete({
        where: {
          userId: id,
        },
      });
      const deletedUser = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return {
        message: `Usuário ${deletedUser.email} foi deletado com sucesso`,
      };
    } catch (error) {
      throw new DeleteUserError(error);
    }
  }
}
