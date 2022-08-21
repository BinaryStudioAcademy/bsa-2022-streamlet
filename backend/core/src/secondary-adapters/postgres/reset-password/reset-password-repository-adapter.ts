import { inject, injectable } from 'inversify';
import { PrismaClient, User } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { generateJwt, verifyJwt } from '~/shared/helpers';
import { CONFIG } from '~/configuration/config';
import { ResetPasswordRepository } from '~/core/reset-password/port/reset-password-repository';

@injectable()
export class ResetPasswordRepositoryAdapter implements ResetPasswordRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async removeForUser(userId: string): Promise<void> {
    await this.prismaClient.resetPasswordToken.deleteMany({
      where: {
        userId,
      },
    });
  }

  async createTokenForUser(userId: string): Promise<string> {
    await this.prismaClient.resetPasswordToken.deleteMany({
      where: {
        userId,
      },
    });
    const token = await generateJwt<ResetTokenJwtPayload>({
      payload: { userId },
      lifetime: CONFIG.ENCRYPTION.RESET_PASSWORD_TOKEN_LIFETIME,
      secret: CONFIG.ENCRYPTION.RESET_PASSWORD_TOKEN_SECRET,
    });
    await this.prismaClient.resetPasswordToken.create({
      data: {
        token,
        userId,
      },
    });
    return token;
  }

  async getResetTokenUser(resetToken: string): Promise<User | null> {
    try {
      const resetTokenPayload = await verifyJwt<ResetTokenJwtPayload>({
        jwt: resetToken,
        secret: CONFIG.ENCRYPTION.RESET_PASSWORD_TOKEN_SECRET,
      });

      const token = await this.prismaClient.resetPasswordToken.findFirst({
        where: {
          userId: resetTokenPayload.userId,
        },
        include: {
          user: true,
        },
      });
      if (token === null) {
        return null;
      }
      return resetToken === token.token ? token.user : null;
    } catch {
      return null;
    }
  }
}

type ResetTokenJwtPayload = {
  userId: string;
};
