import { StreamStatus } from '~/common/enums/enums';
import { Comment } from '../comment';
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
  liveViews: string;
  tags: TagResponseDto[];
  categories: CategoryResponseDto[];
  comments: Comment[];
  channelId: string;
  reactions: string[];
};

export { type VideoStreamResponseDto };
