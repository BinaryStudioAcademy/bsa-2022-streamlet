type BaseVideoResponseDto = {
  id: string;
  name: string;
  status: string;
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
  status: string;
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
};

export { BaseVideoResponseDto, DataVideo, BaseSearchVideoResponseDto };
