import { ChannelSubscriptionStatus, VideoDeviceCategory, VideoReactionStatus } from '~/common/enums/enums';

type CreateVideoStatDto = {
  videoId: string;
  userId?: string;
  watchTime: number;
  device: VideoDeviceCategory;
  language: string;
  isLive: boolean;
  durationStamp: number;
  view?: boolean;
  reaction?: VideoReactionStatus;
  wasSubscribed: boolean;
  subscription?: ChannelSubscriptionStatus;
  commentsActivity?: number;
  chatsActivity?: number;
  source: string;
  createdAt: string;
};

export { type CreateVideoStatDto };
