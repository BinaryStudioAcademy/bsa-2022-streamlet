import { NotificationParams } from 'common/types/types';
import {
  AuthNotification,
  matchAuthNotificationWithIconName,
  matchAuthNotificationWithMessage,
  matchAuthNotificationWithNotificationType,
  matchAuthNotificationWithTitle,
} from './auth-notification/auth-notification';

const allAuthNotifications: Record<AuthNotification, NotificationParams> = [AuthNotification.SIGN_UP_SUCCESS].reduce(
  (prev, curr) => ({
    ...prev,
    [curr]: {
      type: matchAuthNotificationWithNotificationType[curr],
      iconName: matchAuthNotificationWithIconName[curr],
      title: matchAuthNotificationWithTitle[curr],
      message: matchAuthNotificationWithMessage[curr],
    },
  }),
  {} as Record<AuthNotification, NotificationParams>,
);

export { AuthNotification, allAuthNotifications };
