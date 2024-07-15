import { Plan } from '@prisma/client';

export class Profile {
  id: string;
  userId: string;
  avatarUrl?: string;
  birthdate?: string;
  name?: string;
  plan: Plan;

  updatedAt: Date;
}
