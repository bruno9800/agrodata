export class UnauthorizedError extends Error {
  constructor() {
    super('Email address or passwrod provided is incorrect');
  }
}
