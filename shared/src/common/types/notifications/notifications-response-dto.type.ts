import { NotificationFields } from './notification-fields.type';

type NotificationsResponseDto = {
  notifications: NotificationFields[];
  total: number;
};

export { NotificationsResponseDto };
