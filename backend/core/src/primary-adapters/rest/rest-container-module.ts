import { ContainerModule, interfaces } from 'inversify';
import { UserController } from '~/primary-adapters/rest/user/user-controller';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { AuthController } from '~/primary-adapters/rest/auth/auth-controller';
import { HistoryController } from '~/primary-adapters/rest/history/history-controller';
import { ChannelController } from '~/primary-adapters/rest/channel/channel-controller';

const restContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserController>(CONTAINER_TYPES.UserController).to(UserController);
  bind<AuthController>(CONTAINER_TYPES.AuthController).to(AuthController);
  bind<HistoryController>(CONTAINER_TYPES.HistoryController).to(HistoryController);
  bind<ChannelController>(CONTAINER_TYPES.ChannelController).to(ChannelController);
});

export { restContainerModule };
