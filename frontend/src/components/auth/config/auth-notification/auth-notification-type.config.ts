import { NotificationType } from 'common/enums/enums';
import { AuthNotification } from './auth-notification.config.ts';

const matchAuthNotificationWithNotificationType: Record<AuthNotification, NotificationType> = {
  [AuthNotification.SIGN_UP_SUCCESS]: NotificationType.SUCCESS,
  [AuthNotification.ACCOUNT_VERIFICATION_LETTER_SENT]: NotificationType.SUCCESS,
  [AuthNotification.PASSWORD_RESET_LETTER_SENT_SUCCESS]: NotificationType.SUCCESS,
  [AuthNotification.ACCOUNT_VERIFICATION_SUCCESS]: NotificationType.SUCCESS,
  [AuthNotification.PASSWORD_RESET_SUCCESS]: NotificationType.SUCCESS,
};

export { matchAuthNotificationWithNotificationType };
