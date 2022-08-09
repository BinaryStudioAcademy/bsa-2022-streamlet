import { MailType } from '~/shared/enums/enums';
import { MailProps } from '~/shared/types/types';

export interface MailRepository {
  sendEmail(receiver: string, mailType: MailType, props: MailProps): Promise<void>;
}
