import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto, userId: string) {
    return this.profilesService.create(createProfileDto, userId);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findById(@Param() id) {
    return this.profilesService.findById(id);
  }

  @Patch()
  update(@CurrentUser() user, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(user.id, updateProfileDto);
  }
}
