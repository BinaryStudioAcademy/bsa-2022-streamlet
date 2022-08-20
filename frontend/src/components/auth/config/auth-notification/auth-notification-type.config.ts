import { NotificationType } from 'common/enums/enums';
import { AuthNotification } from './auth-notification.config.ts';

const matchAuthNotificationWithNotificationType: Record<AuthNotification, NotificationType> = {
  [AuthNotification.SIGN_UP_SUCCESS]: NotificationType.SUCCESS,
};

export { matchAuthNotificationWithNotificationType };
