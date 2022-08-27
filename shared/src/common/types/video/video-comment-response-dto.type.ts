import { Comment } from '../comment';

export type VideoCommentResponseDto = {
  videoId: string;
  comments: Comment[];
};
