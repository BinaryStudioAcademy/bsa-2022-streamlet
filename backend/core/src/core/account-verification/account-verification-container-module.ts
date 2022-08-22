import { ContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { AccountVerificationService } from './application/account-verification-service';

const accountVerificationContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<AccountVerificationService>(CONTAINER_TYPES.AccountVerificationService).to(AccountVerificationService);
});

export { accountVerificationContainerModule };
