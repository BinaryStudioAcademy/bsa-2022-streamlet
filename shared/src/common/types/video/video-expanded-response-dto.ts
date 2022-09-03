import { BaseVideoResponseDto } from './base-video-response-dto.type';
import { Comment } from '../comment';
import { VideoReaction } from './video-reaction';

export type VideoExpandedResponseDto = BaseVideoResponseDto & {
  channel: {
    id: string;
    name: string;
    avatar: string;
    subscriberCount: number;
  };
  comments: Comment[];
  description: string;
  likeNum: number;
  dislikeNum: number;
  videoPath: string;
  userReaction: VideoReaction | null;
  isUserSubscribedOnChannel: boolean;
};
