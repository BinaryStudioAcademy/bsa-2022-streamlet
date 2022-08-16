import { ContainerModule, interfaces } from 'inversify';
import { UserController } from '~/primary-adapters/rest/user/user-controller';
import { ProfileController } from '~/primary-adapters/rest/profile/profile-controller';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { AuthController } from '~/primary-adapters/rest/auth/auth-controller';

const restContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserController>(CONTAINER_TYPES.UserController).to(UserController);
  bind<AuthController>(CONTAINER_TYPES.AuthController).to(AuthController);
  bind<ProfileController>(CONTAINER_TYPES.ProfileController).to(ProfileController);
});

export { restContainerModule };
