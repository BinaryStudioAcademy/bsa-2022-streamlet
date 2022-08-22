import { ContainerModule, interfaces } from 'inversify';
import { UserController } from '~/primary-adapters/rest/user/user-controller';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { AuthController } from '~/primary-adapters/rest/auth/auth-controller';
import { ChannelStreamingController } from '~/primary-adapters/rest/channel-streaming/channel-streaming-controller';
import { ChannelCrudController } from './channel-crud/channel-crud-controller';

const restContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserController>(CONTAINER_TYPES.UserController).to(UserController);
  bind<AuthController>(CONTAINER_TYPES.AuthController).to(AuthController);
  bind<ChannelStreamingController>(CONTAINER_TYPES.ChannelStreamingController).to(ChannelStreamingController);
  bind<ChannelCrudController>(CONTAINER_TYPES.ChannelCrudController).to(ChannelCrudController);
});

export { restContainerModule };
