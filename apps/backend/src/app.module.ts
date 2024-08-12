import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { SafrasModule } from './safras/safras.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ProductsModule } from './products/products.module';
import { BuyProductsModule } from './buy-products/buy-products.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, SafrasModule, ProfilesModule, ProductsModule, BuyProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
