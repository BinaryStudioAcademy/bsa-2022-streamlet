import { StorageKeys } from 'common/enums/enums';
import { storageService } from 'services/services';

export const saveAccessToken = (accessToken: string): void => {
  storageService.save(StorageKeys.ACCESS_TOKEN, accessToken);
};

export const saveRefreshToken = (refreshToken: string): void => {
  storageService.save(StorageKeys.REFRESH_TOKEN, refreshToken);
};
