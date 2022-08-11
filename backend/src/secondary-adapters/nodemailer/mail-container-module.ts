import { AsyncContainerModule, interfaces } from 'inversify';
import { MailRepository } from '~/core/mail/port/mail-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { MailRepositoryAdapter } from './mail/mail-repository-adapter';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Transporter } from 'nodemailer';
import { getMailTransport } from './mail-transport';

const mailContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  const transport = await getMailTransport();

  bind<MailRepository>(CONTAINER_TYPES.MailRepository).to(MailRepositoryAdapter);
  bind<Transporter<SMTPTransport.SentMessageInfo>>(CONTAINER_TYPES.MailTransporter).toConstantValue(transport);
});

export { mailContainerModule };
