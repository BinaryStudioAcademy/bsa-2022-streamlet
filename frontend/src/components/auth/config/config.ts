import { ToastNotificationParams } from 'common/types/types';
import {
  AuthNotification,
  matchAuthNotificationWithIconName,
  matchAuthNotificationWithMessage,
  matchAuthNotificationWithNotificationType,
  matchAuthNotificationWithTitle,
} from './auth-notification/auth-notification';

const allAuthNotifications: Record<AuthNotification, ToastNotificationParams> = Object.values(AuthNotification).reduce(
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
  {} as Record<AuthNotification, ToastNotificationParams>,
);

export { AuthNotification, allAuthNotifications };
