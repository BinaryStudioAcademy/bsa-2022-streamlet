import { IconName } from 'common/enums/enums';
import { AuthNotification } from './auth-notification.config.ts';

const matchAuthNotificationWithIconName: Record<AuthNotification, IconName> = {
  [AuthNotification.SIGN_UP_SUCCESS]: IconName.BELL,
  [AuthNotification.ACCOUNT_VERIFICATION_LETTER_SENT]: IconName.BELL,
  [AuthNotification.PASSWORD_RESET_LETTER_SENT_SUCCESS]: IconName.BELL,
  [AuthNotification.ACCOUNT_VERIFICATION_SUCCESS]: IconName.BELL,
  [AuthNotification.PASSWORD_RESET_SUCCESS]: IconName.BELL,
};

export { matchAuthNotificationWithIconName };
