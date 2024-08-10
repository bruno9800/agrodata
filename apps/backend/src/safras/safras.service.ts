import { Injectable } from '@nestjs/common';
import { CreateSafraDto } from './dto/create-safra.dto';
import { UpdateSafraDto } from './dto/update-safra.dto';

@Injectable()
export class SafrasService {
  create(createSafraDto: CreateSafraDto) {
    return 'This action adds a new safra';
  }

  findAll() {
    return `This action returns all safras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} safra`;
  }

  update(id: number, updateSafraDto: UpdateSafraDto) {
    return `This action updates a #${id} safra`;
  }

  remove(id: number) {
    return `This action removes a #${id} safra`;
  }
}
