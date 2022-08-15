import { StorageKeys } from 'common/enums/enums';
import { storageService } from 'services/services';

export const removeAccessToken = (): void => {
  storageService.remove(StorageKeys.ACCESS_TOKEN);
};

export const removeRefreshToken = (): void => {
  storageService.remove(StorageKeys.REFRESH_TOKEN);
};
