import { StreamStatus } from '~/common/enums/enums';

interface ResponseVideoQueryRaw {
  id: string;
  name: string;
  description: string;
  videoPath: string;
  liveViews: number;
  videoViews: number;
  channelId: string;
  duration: number;
  poster: string;
  publishedAt: string;
  scheduledStreamDate: string;
  status: StreamStatus;
  ch_id: string;
  ch_name: string;
  ch_avatar: string;
  total: number;
}

export { ResponseVideoQueryRaw };
