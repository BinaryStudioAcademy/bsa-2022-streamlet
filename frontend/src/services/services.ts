import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { VideoApi } from './video-api/video-api.service';
import { StorageService } from './storage/local-storage.service';
import { TokensStorageService } from './storage/tokens-storage.service';
import { attachAuthTokenInterceptor } from './http/interceptors/attach-auth-token-interceptor';
import { refreshTokenInterceptor } from './http/interceptors/refresh-token-interceptor';
import { ENV } from 'common/enums/enums';
import { ProfileApi } from './profile/profile-api.service';
import { NotificationApi } from './notification/notification.service';
import { ChannelCrudApi } from './channel-crud-api/channel-crud-api.service';
import { ChannelSubscriptionApi } from './channel-subscription-api/channel-subscription-api.service';
import { CategoryApi } from './category-api/video-api.service';

const storageService = new StorageService();
const tokensStorageService = new TokensStorageService(storageService);

const http = new Http([attachAuthTokenInterceptor], [refreshTokenInterceptor]);
const authApi = new AuthApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const profileApi = new ProfileApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const notificationApi = new NotificationApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const channelCrudApi = new ChannelCrudApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const videoApi = new VideoApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const categoryApi = new CategoryApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const channelSubscriptionApi = new ChannelSubscriptionApi({
  apiPrefix: ENV.API_PATH,
  http,
});

export {
  http,
  authApi,
  profileApi,
  notificationApi,
  storageService,
  tokensStorageService,
  videoApi,
  categoryApi,
  channelCrudApi,
  channelSubscriptionApi,
};
