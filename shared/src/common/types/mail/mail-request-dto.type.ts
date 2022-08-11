import { MailType } from '~/common/enums/enums';
import { MailPropsType } from './mail-props/mail-props';

type MailRequestDto = {
  receiver: string;
  type: MailType;
  props: MailPropsType;
};

export { type MailRequestDto };
