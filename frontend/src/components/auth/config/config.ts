import { NotificationParams } from 'common/types/types';
import {
  AuthNotification,
  matchAuthNotificationWithIconName,
  matchAuthNotificationWithMessage,
  matchAuthNotificationWithNotificationType,
  matchAuthNotificationWithTitle,
} from './auth-notification/auth-notification';

const allAuthNotifications: Record<AuthNotification, NotificationParams> = Object.values(AuthNotification).reduce(
  (prev, curr) => ({
    ...prev,
    [curr]: {
      type: matchAuthNotificationWithNotificationType[curr],
      iconName: matchAuthNotificationWithIconName[curr],
      title: matchAuthNotificationWithTitle[curr],
      message: matchAuthNotificationWithMessage[curr],
      durationMs: 10_000,
    },
  }),
  {} as Record<AuthNotification, NotificationParams>,
);

export { AuthNotification, allAuthNotifications };
