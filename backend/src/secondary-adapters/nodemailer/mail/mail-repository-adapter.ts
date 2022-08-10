import Email from 'email-templates';
import { inject, injectable } from 'inversify';
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { CONFIG } from '~/configuration/config';
import { MailRepository } from '~/core/mail/port/mail-repository';
import { CONTAINER_TYPES, MailRequestDto, MailResponseDto } from '~/shared/types/types';

@injectable()
export class MailRepositoryAdapter implements MailRepository {
  private transport: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(@inject(CONTAINER_TYPES.MailTransporter) transport: Transporter<SMTPTransport.SentMessageInfo>) {
    this.transport = transport;
  }

  async sendEmail(mailRequestDto: MailRequestDto): Promise<MailResponseDto> {
    const email = new Email({
      views: { root: '~/shared/mail-templates' },
      message: {
        from: `Streamlet <${CONFIG.MAIL_SERVICE.ADDRESS}>`,
      },
      preview: false,
      send: true,
      transport: this.transport,
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: '~/shared/mail-templates',
        },
      },
    });

    return email.send({
      template: mailRequestDto.type,
      message: {
        to: mailRequestDto.receiver,
      },
      locals: {
        ...mailRequestDto.props,
      },
    });
  }
}
