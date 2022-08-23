import { ContainerModule, interfaces } from 'inversify';
import { ProfileService } from './aplication/profile-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const profileContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ProfileService>(CONTAINER_TYPES.ProfileService).to(ProfileService);
});

export { profileContainerModule };
