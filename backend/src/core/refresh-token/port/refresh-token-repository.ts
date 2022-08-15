import { User } from '@prisma/client';

export interface RefreshTokenRepository {
  createForUser(userId: string): Promise<string>;
  removeForUser(userId: string): Promise<void>;
  getRefreshTokenUser(refreshToken: string): Promise<User | null>;
}
