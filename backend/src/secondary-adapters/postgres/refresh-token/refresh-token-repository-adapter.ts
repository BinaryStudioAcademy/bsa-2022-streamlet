import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { generateRefreshToken, hashValue } from '~/shared/helpers';
import bcrypt from 'bcrypt';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';

@injectable()
export class RefreshTokenRepositoryAdapter implements RefreshTokenRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  async checkForExistence(userId: string, refreshToken: string): Promise<boolean> {
    const token = await this.prismaClient.refreshToken.findFirst({
      where: {
        userId,
      },
    });
    if (token === null) {
      return false;
    }

    return bcrypt.compare(refreshToken, token.token);
  }

  async createForUser(userId: string): Promise<string> {
    await this.prismaClient.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
    const token = await generateRefreshToken();
    await this.prismaClient.refreshToken.create({
      data: {
        token: await hashValue(token),
        userId,
      },
    });
    return token;
  }
}
