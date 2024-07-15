export class User {
  id: string;
  email: string;
  hashedPassword?: string;
  googleId?: string;

  createdAt: Date;
  updatedAt: Date;
}
