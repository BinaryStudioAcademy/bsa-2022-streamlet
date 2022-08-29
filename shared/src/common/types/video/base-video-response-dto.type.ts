import { StreamStatus } from '.prisma/client';

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

type DataVideo = {
  list: BaseVideoResponseDto[];
  total: number;
};

export { BaseVideoResponseDto, DataVideo };
