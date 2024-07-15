import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends HttpException {
  constructor() {
    const message = 'User not found';
    const status = HttpStatus.NOT_FOUND;
    super(message, status);
  }
}
