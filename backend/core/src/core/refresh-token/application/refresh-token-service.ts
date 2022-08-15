import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';

@injectable()
export class RefreshTokenService {
  private refreshTokenRepository: RefreshTokenRepository;

  constructor(@inject(CONTAINER_TYPES.RefreshTokenRepository) refreshTokenRepository: RefreshTokenRepository) {
    this.refreshTokenRepository = refreshTokenRepository;
  }

  async checkForExistence(userId: string, refreshToken: string): Promise<boolean> {
    return this.refreshTokenRepository.checkForExistence(userId, refreshToken);
  }
}
