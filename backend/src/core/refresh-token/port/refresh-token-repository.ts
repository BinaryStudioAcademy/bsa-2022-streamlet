import { User } from '@prisma/client';

export interface RefreshTokenRepository {
  createForUser(userId: string): Promise<string>;
  getRefreshTokenUser(refreshToken: string): Promise<User | null>;
}
