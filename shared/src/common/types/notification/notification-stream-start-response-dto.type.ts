import { NotificationType } from '~/common/enums/enums';

type NotificationStreamStartResponseDto = {
  id: string;
  isViewed: boolean;
  createdAt: Date;
  type: NotificationType.STREAM_START;
  link: string;
  username: string;
  videoName: string;
  avatar: string;
  videoPreview: string;
};

export { NotificationStreamStartResponseDto };
