import { Module } from '@nestjs/common';
import { SafrasService } from './safras.service';
import { SafrasController } from './safras.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [SafrasController],
  providers: [SafrasService],
  exports: [SafrasService],
})
export class SafrasModule {}
