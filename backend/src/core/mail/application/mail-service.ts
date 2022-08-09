import { inject, injectable } from 'inversify';
import { MailType } from '~/shared/enums/enums';
import { CONTAINER_TYPES, MailProps } from '~/shared/types/types';
import { MailRepository } from '~/core/mail/port/mail-repository';

@injectable()
export class MailService {
  private mailRepository: MailRepository;

  constructor(@inject(CONTAINER_TYPES.MailRepository) mailRepository: MailRepository) {
    this.mailRepository = mailRepository;
  }

  async sendEmail(receiver: string, mailType: MailType, props: MailProps): Promise<void> {
    return this.mailRepository.sendEmail(receiver, mailType, props);
  }
}
