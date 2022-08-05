import { ContainerModule, interfaces } from 'inversify';
import { UserService } from './application/user-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const userContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserService>(CONTAINER_TYPES.UserService).to(UserService);
});

export { userContainerModule };
