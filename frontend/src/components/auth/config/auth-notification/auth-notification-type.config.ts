import { ToastNotificationType } from 'common/enums/enums';
import { AuthNotification } from './auth-notification.config.ts';

const matchAuthNotificationWithNotificationType: Record<AuthNotification, ToastNotificationType> = {
  [AuthNotification.SIGN_UP_SUCCESS]: ToastNotificationType.SUCCESS,
};

export { matchAuthNotificationWithNotificationType };
