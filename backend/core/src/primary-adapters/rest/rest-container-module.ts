import { ContainerModule, interfaces } from 'inversify';
import { UserController } from '~/primary-adapters/rest/user/user-controller';
import { ProfileController } from '~/primary-adapters/rest/profile/profile-controller';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { AuthController } from '~/primary-adapters/rest/auth/auth-controller';
import { ChannelController } from '~/primary-adapters/rest/channel/channel-controller';
import { HistoryController } from '~/primary-adapters/rest/history/history-controller';

const restContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserController>(CONTAINER_TYPES.UserController).to(UserController);
  bind<AuthController>(CONTAINER_TYPES.AuthController).to(AuthController);
  bind<ChannelController>(CONTAINER_TYPES.ChannelController).to(ChannelController);
  bind<ProfileController>(CONTAINER_TYPES.ProfileController).to(ProfileController);
  bind<HistoryController>(CONTAINER_TYPES.HistoryController).to(HistoryController);
});

export { restContainerModule };
