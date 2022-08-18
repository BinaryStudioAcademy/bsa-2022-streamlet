import { ContainerModule, interfaces } from 'inversify';
import { UserController } from '~/primary-adapters/rest/user/user-controller';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { AuthController } from '~/primary-adapters/rest/auth/auth-controller';
import { VideoController } from '~/primary-adapters/rest/video/video-controller';

const restContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserController>(CONTAINER_TYPES.UserController).to(UserController);
  bind<AuthController>(CONTAINER_TYPES.AuthController).to(AuthController);
  bind<VideoController>(CONTAINER_TYPES.VideoController).to(VideoController);
});

export { restContainerModule };
