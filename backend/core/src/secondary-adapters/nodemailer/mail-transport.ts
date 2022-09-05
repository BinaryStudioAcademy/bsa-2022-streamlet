import { CONFIG } from '~/configuration/config';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPConnection from 'nodemailer/lib/smtp-connection';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const getMailTransport = async (): Promise<Transporter<SMTPTransport.SentMessageInfo>> => {
  const auth: SMTPConnection.AuthenticationTypeLogin = {
    user: CONFIG.MAIL_SERVICE.LOGIN,
    pass: CONFIG.MAIL_SERVICE.PASSWORD,
  };

  return nodemailer.createTransport({
    service: 'gmail',
    auth,
  });
};

export { getMailTransport };
