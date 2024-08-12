import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSafraDto } from './dto/create-safra.dto';
import { UpdateSafraDto } from './dto/update-safra.dto';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SafrasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UserService,
  ) {}
  async create(createSafraDto: CreateSafraDto, userId: string) {
    const user = await this.user.findById(userId);

    const createdSafra = await this.prisma.safra.create({
      data: {
        ...createSafraDto,
        userId: user.id,
      },
    });

    if (!createdSafra)
      throw new Error('Não foi possível criar uma nova safra! Tente novamente');

    return createdSafra;
  }

  async findAll(userId: string) {
    await this.user.findById(userId);

    const safras = await this.prisma.safra.findMany({
      where: {
        userId,
      },
    });
    return safras;
  }

  async findOne(id: number, userId: string) {
    const safra = await this.prisma.safra.findUnique({
      where: {
        id,
      },
    });
    if (!safra) throw new NotFoundException('Safra não encontrada!');

    if (safra.userId !== userId)
      throw new UnauthorizedException('Unauthorized! You dont own this safra');

    return safra;
  }

  async update(id: number, updateSafraDto: UpdateSafraDto, userId: string) {
    await this.findOne(id, userId);

    const updatedSafra = await this.prisma.safra.update({
      where: { id },
      data: {
        ...updateSafraDto,
      },
    });

    if (!updatedSafra)
      throw new BadRequestException(
        'Houve um erro ao tentar atualizar essa safra!',
      );

    return updatedSafra;
  }

  async remove(id: number, userId: string) {
    await this.findOne(id, userId);

    try {
      await this.prisma.safra.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        'Algo inesperado aconteceu e não foi possível deletar essa safra, tente novamente!',
        HttpStatus.NOT_MODIFIED,
      );
    }
  }
}
