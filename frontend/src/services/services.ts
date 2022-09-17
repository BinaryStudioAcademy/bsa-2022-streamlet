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
import { CategoryApi } from './category-api/category-api.service';
import { ChatApi } from './chat-api/chat-api.service';
import { HistoryApi } from './history/history-api.service';
import { FollowingApi } from './following-api/following-api.service';
import { SearchApi } from './search-api/search-api.service';
import { ChannelStreamingApi } from './channel-streaming-api/channel-streaming-api.service';
import { PreferencesApi } from './preferences-api/preferences-api.service';
import { CommentApi } from './comment-api/comment-api.service';
import { StatsApi } from './stats-api/stats-api.service';

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

const statsApi = new StatsApi({
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

const chatApi = new ChatApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const commentApi = new CommentApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const historyApi = new HistoryApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const followingApi = new FollowingApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const searchApi = new SearchApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const channelStreamingApi = new ChannelStreamingApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const preferencesApi = new PreferencesApi({
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
  statsApi,
  channelSubscriptionApi,
  chatApi,
  commentApi,
  followingApi,
  historyApi,
  searchApi,
  channelStreamingApi,
  preferencesApi,
};
