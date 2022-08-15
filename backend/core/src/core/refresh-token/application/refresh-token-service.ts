import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';
import { User } from '@prisma/client';

@injectable()
export class RefreshTokenService {
  private refreshTokenRepository: RefreshTokenRepository;

  constructor(@inject(CONTAINER_TYPES.RefreshTokenRepository) refreshTokenRepository: RefreshTokenRepository) {
    this.refreshTokenRepository = refreshTokenRepository;
  }

  async getRefreshTokenUser(refreshToken: string): Promise<User | null> {
    return this.refreshTokenRepository.getRefreshTokenUser(refreshToken);
  }

  async removeForUser(userId: string): Promise<void> {
    return this.refreshTokenRepository.removeForUser(userId);
  }
}
