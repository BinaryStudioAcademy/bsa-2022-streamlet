import { StreamStatus } from '~/common/enums/enums';

type VideoCard = {
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

export { type VideoCard };
