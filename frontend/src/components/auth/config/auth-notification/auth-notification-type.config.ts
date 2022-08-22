import { ToastNotificationType } from 'common/enums/enums';
import { AuthNotification } from './auth-notification.config.ts';

const matchAuthNotificationWithNotificationType: Record<AuthNotification, ToastNotificationType> = {
  [AuthNotification.SIGN_UP_SUCCESS]: ToastNotificationType.SUCCESS,
  [AuthNotification.ACCOUNT_VERIFICATION_LETTER_SENT]: ToastNotificationType.SUCCESS,
  [AuthNotification.PASSWORD_RESET_LETTER_SENT_SUCCESS]: ToastNotificationType.SUCCESS,
  [AuthNotification.ACCOUNT_VERIFICATION_SUCCESS]: ToastNotificationType.SUCCESS,
  [AuthNotification.PASSWORD_RESET_SUCCESS]: ToastNotificationType.SUCCESS,
};

export { matchAuthNotificationWithNotificationType };
