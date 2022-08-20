import { commentAuthor } from '~/common/types/video/comment-author';

export type VideoComment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  author: commentAuthor;
};

export type VideoCommentResponseDto = {
  videoId: string;
  comments: VideoComment[];
};
