import { createMailTransport } from '~/configuration/mail-transport';
import { CONFIG } from '~/configuration/config';
import { injectable } from 'inversify';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@injectable()
export class MailService {
  async sendEmail(receiver: string): Promise<SMTPTransport.SentMessageInfo> {
    const transport = await createMailTransport();
    return transport.sendMail({
      from: `Streamlet <${CONFIG.MAIL_SERVICE.ADDRESS}>`,
      to: receiver,
      subject: 'Confirm your account on Streamlet',
      text: 'Test message',
      html: '<h1>Test message</h1>',
    });
  }
}
