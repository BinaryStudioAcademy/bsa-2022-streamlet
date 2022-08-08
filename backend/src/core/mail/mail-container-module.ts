import { ContainerModule, interfaces } from 'inversify';
import { MailService } from './application/mail-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const mailContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<MailService>(CONTAINER_TYPES.MailService).to(MailService);
});

export { mailContainerModule };
