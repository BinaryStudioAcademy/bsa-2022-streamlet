import { ContainerModule, interfaces } from 'inversify';
import { UserController } from '~/primary-adapters/rest/user/user-controller';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { AuthController } from '~/primary-adapters/rest/auth/auth-controller';
import { ChannelController } from '~/primary-adapters/rest/channel/channel-controller';
import { TagController } from './tag/tag-controller';

const restContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserController>(CONTAINER_TYPES.UserController).to(UserController);
  bind<AuthController>(CONTAINER_TYPES.AuthController).to(AuthController);
  bind<ChannelController>(CONTAINER_TYPES.ChannelController).to(ChannelController);
  bind<TagController>(CONTAINER_TYPES.TagController).to(TagController);
});

export { restContainerModule };
