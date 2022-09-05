import { StreamPrivacy, StreamStatus } from '~/common/enums/enums';
import { TagResponseDto, CategoryResponseDto } from '../types';

type VideoStreamResponseDto = {
  id: string;
  name: string;
  description: string;
  status: StreamStatus;
  isReadyToStream: boolean;
  publishedAt: string;
  scheduledStreamDate: string;
  poster: string;
  videoPath: string;
  liveViews: number;
  videoViews: number;
  tags: TagResponseDto[];
  categories: CategoryResponseDto[];
  channelId: string;
  privacy: StreamPrivacy;
};

export { type VideoStreamResponseDto };
