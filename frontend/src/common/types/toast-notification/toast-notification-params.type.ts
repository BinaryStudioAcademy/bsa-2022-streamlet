import { NOTIFICATION_TYPE } from 'react-notifications-component';

type ToastNotificationParams = {
  type: NOTIFICATION_TYPE;
  iconName: string;
  title: string;
  message: string;
  durationMs?: number;
};

export { ToastNotificationParams };
