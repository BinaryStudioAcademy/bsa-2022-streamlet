import { NotificationType } from '~/common/enums/enums';

type NotificationMessageResponseDto = {
  id: string;
  isViewed: boolean;
  createdAt: Date;
  type: NotificationType.TEXT_MESSAGE;
  message: string;
};

export { NotificationMessageResponseDto };
