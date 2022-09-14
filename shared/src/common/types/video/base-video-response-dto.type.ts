import { StreamStatus } from '~/common/enums/enums';

type BaseVideoResponseDto = {
  id: string;
  name: string;
  status: StreamStatus;
  publishedAt: string;
  scheduledStreamDate: string;
  poster: string;
  duration: number;
  videoViews: number;
  liveViews: number;
  channel: {
    id: string;
    name: string;
    avatar: string;
  };
};

type BaseVideoResponseArrayWithTotalNum = { list: BaseVideoResponseDto[]; totalVideosNum: number };

type BaseSearchVideoResponseDto = {
  id: string;
  name: string;
  description: string;
  videoPath: string;
  liveViews: number;
  videoViews: number;
  channelId: string;
  createdAt: string;
  updatedAt: string;
  status: StreamStatus;
  duration: number;
  poster: string;
  publishedAt: string;
  scheduledStreamDate: string;
  channelName: string;
  channelAvatar: string;
};

type DataVideo = {
  list: BaseVideoResponseDto[];
  total: number;
  lazyLoad?: boolean;
};

export { BaseVideoResponseDto, DataVideo, BaseSearchVideoResponseDto, BaseVideoResponseArrayWithTotalNum };
