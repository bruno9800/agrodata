import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { User } from 'src/user/entities/user.entity';
import { IUserPayload } from './models/user-payload';
import { JwtService } from '@nestjs/jwt';
import { IUserToken } from './models/user-token';
import { GoogleUser } from './models/google-request';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): IUserToken {
    // Transformar o user em um JWT
    const payload: IUserPayload = {
      sub: user.id,
      email: user.email,
    };
    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError();
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedError();
    }

    return {
      ...user,
      hashedPassword: undefined,
    };
  }

  async googleLogin(user: GoogleUser): Promise<IUserToken> {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userAlreadyExists = await this.userService.findByEmail(user.email);

    if (!userAlreadyExists) {
      const newUser = await this.userService.create(
        {
          email: user.email,
          hashedPassword: process.env.TEMP_PASSWORD,
          googleId: user.googleId,
        },
        {
          avatarUrl: user.picture,
          name: `${user.firstName} ${user.lastName}`,
        },
      );

      const jwtToken = this.jwtService.sign({
        sub: newUser.user.id,
        email: newUser.user.email,
      });

      return {
        access_token: jwtToken,
        needsPasswordUpdate: true,
      };
    }

    const jwtToken = this.jwtService.sign({
      sub: userAlreadyExists.id,
      email: userAlreadyExists.email,
    });

    const isTempPassword = await bcrypt.compare(
      process.env.TEMP_PASSWORD,
      userAlreadyExists.hashedPassword,
    );

    return {
      access_token: jwtToken,
      needsPasswordUpdate: isTempPassword,
    };
  }
  //end class
}
