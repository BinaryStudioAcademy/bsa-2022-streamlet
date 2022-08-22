import { ContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { ResetPasswordService } from './application/reset-password-service';

const resetPasswordContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ResetPasswordService>(CONTAINER_TYPES.ResetPasswordService).to(ResetPasswordService);
});

export { resetPasswordContainerModule };
