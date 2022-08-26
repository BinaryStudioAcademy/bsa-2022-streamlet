import { UserProfile } from '@prisma/client';

export type commentFromDb = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  author: { username: string; profile: UserProfile | null };
};
