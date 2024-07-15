import { Request } from 'express';

export interface GoogleUser {
  googleId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

export interface GoogleRequest extends Request {
  user: GoogleUser;
}
