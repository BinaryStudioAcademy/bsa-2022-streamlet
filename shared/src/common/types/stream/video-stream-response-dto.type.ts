import { TagResponseDto, CategoryResponseDto } from '../types';

type VideoStreamResponseDto = {
  id: string;
  name: string;
  description: string;
  status: string;
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
};

export { type VideoStreamResponseDto };
