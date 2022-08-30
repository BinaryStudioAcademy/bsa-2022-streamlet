import { ContainerModule, interfaces } from 'inversify';
import { UserController } from '~/primary-adapters/rest/user/user-controller';
import { ProfileController } from '~/primary-adapters/rest/profile/profile-controller';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { AuthController } from '~/primary-adapters/rest/auth/auth-controller';
import { TagController } from './tag/tag-controller';
import { CategoryController } from './category/category-controller';
import { ChannelStreamingController } from '~/primary-adapters/rest/channel-streaming/channel-streaming-controller';
import { ChannelCrudController } from './channel-crud/channel-crud-controller';
import { HistoryController } from '~/primary-adapters/rest/history/history-controller';
import { VideoController } from './video/video-controller';
import { ChannelSubscriptionController } from './channel-subscription/channel-subscription-controller';
import { ChatController } from './chat/chat-controller';
import { HealthcheckController } from '~/primary-adapters/rest/healthcheck/healthcheck-controller';
import { FollowingController } from './following/following-controller';

const restContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserController>(CONTAINER_TYPES.UserController).to(UserController);
  bind<VideoController>(CONTAINER_TYPES.VideoController).to(VideoController);
  bind<AuthController>(CONTAINER_TYPES.AuthController).to(AuthController);
  bind<TagController>(CONTAINER_TYPES.TagController).to(TagController);
  bind<CategoryController>(CONTAINER_TYPES.CategoryController).to(CategoryController);
  bind<ChannelStreamingController>(CONTAINER_TYPES.ChannelStreamingController).to(ChannelStreamingController);
  bind<ChannelCrudController>(CONTAINER_TYPES.ChannelCrudController).to(ChannelCrudController);
  bind<ChatController>(CONTAINER_TYPES.ChatController).to(ChatController);
  bind<ProfileController>(CONTAINER_TYPES.ProfileController).to(ProfileController);
  bind<HistoryController>(CONTAINER_TYPES.HistoryController).to(HistoryController);
  bind<ChannelSubscriptionController>(CONTAINER_TYPES.ChannelSubscriptionController).to(ChannelSubscriptionController);
  bind<HealthcheckController>(CONTAINER_TYPES.HealthcheckController).to(HealthcheckController);
  bind<FollowingController>(CONTAINER_TYPES.FollowingController).to(FollowingController);
});

export { restContainerModule };
