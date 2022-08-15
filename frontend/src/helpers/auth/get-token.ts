import { StorageKeys } from 'common/enums/enums';
import { storageService } from 'services/services';

export const getAccessToken = (): string | null => {
  return storageService.retrieve(StorageKeys.ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
  return storageService.retrieve(StorageKeys.REFRESH_TOKEN);
};
