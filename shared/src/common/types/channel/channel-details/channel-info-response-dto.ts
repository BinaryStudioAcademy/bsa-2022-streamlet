import { ChannelVideoPreviewsPageDto } from './channel-video-previews-response-dto';

export type ChannelInfoResponseDto = {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
  bannerImage: string;
  avatar: string;
  subscribersCount: number;
  authorInfo: ChannelAuthorPreviewInfo;
  createdAt: string;
  isCurrentUserSubscriber: boolean;
  // when pagination is implemented
  // will return only n first videos for initial page, currently returns all at once
  initialVideosPage: ChannelVideoPreviewsPageDto;
};

type ChannelAuthorPreviewInfo = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
};
