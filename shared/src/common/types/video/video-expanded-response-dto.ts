import { BaseVideoResponseDto } from './base-video-response-dto.type';
import { Comment } from '../comment';

export type VideoExpandedResponseDto = BaseVideoResponseDto & {
  comments: Comment[];
  description: string;
  isUserSubscribedOnChannel: boolean;
};
