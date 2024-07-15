import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/auth-request';
import { IsPublic } from './decorators/is-public.decorator';
import { GoogleOauthGuard } from './guards/google-auth.guard';
import { GoogleRequest } from './models/google-request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard) // verifica o login antes de acessar a rota
  /**
   * Formato do body obrigatório { email: , password: }
   */
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
  @IsPublic()
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Request() req) {}

  @IsPublic()
  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Request() req: GoogleRequest) {
    return await this.authService.googleLogin(req.user);
  }
}
