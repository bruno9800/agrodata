import { HttpException, HttpStatus } from '@nestjs/common';

export class ProfileNotFoundError extends HttpException {
  constructor() {
    const message = 'Profile not found';
    const status = HttpStatus.NOT_FOUND;
    super(message, status);
  }
}
