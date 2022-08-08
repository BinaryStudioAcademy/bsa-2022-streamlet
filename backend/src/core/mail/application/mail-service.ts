import { createMailTransport } from '~/configuration/mail-transport';
import { CONFIG } from '~/configuration/config';
import { injectable } from 'inversify';
import Email from 'email-templates';
import { MailType } from '~/shared/enums/enums';
import { MailProps } from '~/shared/types/types';

@injectable()
export class MailService {
  async sendEmail(receiver: string, mailType: MailType, props: MailProps): Promise<void> {
    const transport = await createMailTransport();
    const email = new Email({
      views: { root: '~/shared/mail-templates' },
      message: {
        from: `Streamlet <${CONFIG.MAIL_SERVICE.ADDRESS}>`,
      },
      preview: false,
      send: true,
      transport,
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: '~/shared/mail-templates',
        },
      },
    });

    return email.send({
      template: mailType,
      message: {
        to: receiver,
      },
      locals: {
        ...props,
      },
    });
  }
}
