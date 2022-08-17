import { NotificationBaseResponseDto } from './notification-base-response-dto.type';

type NotificationListResponseDto = {
  notifications: NotificationBaseResponseDto[];
  total: number;
};

export { NotificationListResponseDto };
