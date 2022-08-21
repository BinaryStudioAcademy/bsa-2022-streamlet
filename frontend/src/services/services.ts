import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { VideoApi } from './video-api/video-api.service';
import { StorageService } from './storage/local-storage.service';
import { TokensStorageService } from './storage/tokens-storage.service';
import { attachAuthTokenInterceptor } from './http/interceptors/attach-auth-token-interceptor';
import { refreshTokenInterceptor } from './http/interceptors/refresh-token-interceptor';
import { ENV } from 'common/enums/enums';

const storageService = new StorageService();
const tokensStorageService = new TokensStorageService(storageService);

const http = new Http([attachAuthTokenInterceptor], [refreshTokenInterceptor]);
const authApi = new AuthApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const videoApi = new VideoApi({
  apiPrefix: ENV.API_PATH,
  http,
});

export { http, authApi, storageService, tokensStorageService, videoApi };
