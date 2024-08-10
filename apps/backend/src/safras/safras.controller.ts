import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SafrasService } from './safras.service';
import { CreateSafraDto } from './dto/create-safra.dto';
import { UpdateSafraDto } from './dto/update-safra.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('safras')
export class SafrasController {
  constructor(private readonly safrasService: SafrasService) {}

  @Post()
  create(@Body() createSafraDto: CreateSafraDto, @CurrentUser() user) {
    return this.safrasService.create(createSafraDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.safrasService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.safrasService.findOne(+id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSafraDto: UpdateSafraDto,
    @CurrentUser() user,
  ) {
    return this.safrasService.update(+id, updateSafraDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user) {
    return this.safrasService.remove(+id, user.id);
  }
}
