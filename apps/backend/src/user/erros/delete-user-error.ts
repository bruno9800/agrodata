import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteUserError extends HttpException {
  constructor(error: any) {
    const message = 'Error when deleting user';
    const status = HttpStatus.BAD_REQUEST;
    super(
      {
        message,
        error: error,
      },
      status,
    );
  }
}
