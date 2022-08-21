import { NotificationType } from '~/common/enums/enums';

type NotificationBaseResponseDto = {
  id: string;
  isViewed: boolean;
  createdAt: Date;
  type: NotificationType;
  message?: string;
  link?: string;
  username?: string;
  videoName?: string;
  avatar?: string;
  videoPreview?: string;
};

export { NotificationBaseResponseDto };
