import { CONFIG } from '~/configuration/config';
import nodemailer, { Transporter } from 'nodemailer';
import { google } from 'googleapis';
import SMTPConnection from 'nodemailer/lib/smtp-connection';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const getMailTransport = async (): Promise<Transporter<SMTPTransport.SentMessageInfo>> => {
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

  return nodemailer.createTransport({
    service: 'gmail',
    auth,
  });
};

export { getMailTransport };
