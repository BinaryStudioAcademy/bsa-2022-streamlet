import { CONFIG } from '~/configuration/config';
import nodemailer, { Transporter } from 'nodemailer';
import { google } from 'googleapis';
import SMTPConnection from 'nodemailer/lib/smtp-connection';
import { AsyncContainerModule, interfaces } from 'inversify';
import { MailRepository } from '~/core/mail/port/mail-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { MailRepositoryAdapter } from './mail/mail-repository-adapter';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const mailContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  const mailServiceOAuth2Client = new google.auth.OAuth2(
    CONFIG.MAIL_SERVICE.CLIENT_ID,
    CONFIG.MAIL_SERVICE.CLIENT_SECRET,
    CONFIG.MAIL_SERVICE.REDIRECT_URI,
  );
  mailServiceOAuth2Client.setCredentials({ refresh_token: CONFIG.MAIL_SERVICE.REFRESH_TOKEN });
  const accessToken = (await mailServiceOAuth2Client.getAccessToken()) as string;
  const auth: SMTPConnection.AuthenticationTypeOAuth2 = {
    type: 'OAuth2',
    user: CONFIG.MAIL_SERVICE.ADDRESS,
    clientId: CONFIG.MAIL_SERVICE.CLIENT_ID,
    clientSecret: CONFIG.MAIL_SERVICE.CLIENT_SECRET,
    refreshToken: CONFIG.MAIL_SERVICE.REFRESH_TOKEN,
    accessToken,
  };

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth,
  });

  bind<MailRepository>(CONTAINER_TYPES.MailRepository).to(MailRepositoryAdapter);
  bind<Transporter<SMTPTransport.SentMessageInfo>>(CONTAINER_TYPES.MailTransporter).toConstantValue(transport);
});

export { mailContainerModule };
