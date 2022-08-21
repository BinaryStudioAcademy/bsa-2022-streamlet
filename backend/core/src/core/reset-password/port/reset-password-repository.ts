import { User } from '@prisma/client';

export interface ResetPasswordRepository {
  createTokenForUser(userId: string): Promise<string>;
  getResetTokenUser(refsetToken: string): Promise<User | null>;
  removeForUser(userId: string): Promise<void>;
}
