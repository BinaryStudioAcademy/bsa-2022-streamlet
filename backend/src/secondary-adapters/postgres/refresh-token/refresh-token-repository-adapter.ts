import { inject, injectable } from 'inversify';
import { PrismaClient, User } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { generateJwt, verifyJwt } from '~/shared/helpers';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';
import { CONFIG } from '~/configuration/config';

@injectable()
export class RefreshTokenRepositoryAdapter implements RefreshTokenRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async removeForUser(userId: string): Promise<void> {
    await this.prismaClient.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }

  async getRefreshTokenUser(refreshToken: string): Promise<User | null> {
    try {
      const refreshTokenPayload = await verifyJwt<RefreshTokenJwtPayload>(refreshToken);
      const token = await this.prismaClient.refreshToken.findFirst({
        where: {
          userId: refreshTokenPayload.userId,
        },
        include: {
          user: true,
        },
      });
      if (token === null) {
        return null;
      }
      return refreshToken === token.token ? token.user : null;
    } catch {
      return null;
    }
  }

  async createForUser(userId: string): Promise<string> {
    await this.prismaClient.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
    const token = await generateJwt<RefreshTokenJwtPayload>({
      payload: { userId },
      lifetime: CONFIG.ENCRYPTION.REFRESH_LIFETIME,
    });
    await this.prismaClient.refreshToken.create({
      data: {
        token,
        userId,
      },
    });
    return token;
  }
}

type RefreshTokenJwtPayload = {
  userId: string;
};
