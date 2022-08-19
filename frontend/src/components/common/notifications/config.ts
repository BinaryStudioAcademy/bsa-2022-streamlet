import { NOTIFICATION_TYPE } from 'react-notifications-component';

interface INotificationParams {
  type: NOTIFICATION_TYPE;
  iconName: string;
  title: string;
  message: string;
}

export { INotificationParams };
