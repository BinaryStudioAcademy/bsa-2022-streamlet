import { StorageKeys } from 'common/enums/enums';
import { TokenPair } from 'common/types/types';
import { StorageService } from './local-storage.service';

export class TokensStorageService {
  constructor(private storageService: StorageService) {}

  public saveTokens({ accessToken, refreshToken }: Partial<TokenPair>): void {
    if (accessToken) {
      this.storageService.save(StorageKeys.ACCESS_TOKEN, accessToken);
    }
    if (refreshToken) {
      this.storageService.save(StorageKeys.REFRESH_TOKEN, refreshToken);
    }
  }

  public clearTokens(): void {
    this.storageService.remove(StorageKeys.ACCESS_TOKEN);
    this.storageService.remove(StorageKeys.REFRESH_TOKEN);
  }

  public getTokens(): { [K in keyof TokenPair]: TokenPair[K] | null } {
    return {
      accessToken: this.storageService.retrieve(StorageKeys.ACCESS_TOKEN),
      refreshToken: this.storageService.retrieve(StorageKeys.REFRESH_TOKEN),
    };
  }
}
