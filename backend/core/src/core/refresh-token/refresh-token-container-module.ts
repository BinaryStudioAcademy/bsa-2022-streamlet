import { ContainerModule, interfaces } from 'inversify';
import { RefreshTokenService } from './application/refresh-token-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const refreshTokenContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<RefreshTokenService>(CONTAINER_TYPES.RefreshTokenService).to(RefreshTokenService);
});

export { refreshTokenContainerModule };
