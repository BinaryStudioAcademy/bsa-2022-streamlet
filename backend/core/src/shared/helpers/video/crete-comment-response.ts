import { UserProfile } from '@prisma/client';
import { VideoComment } from 'shared/build/common/types/video/video-coment';
import { type commentFromDb } from './types/types';
type Comment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  author: { username: string; profile: UserProfile | null };
};

export const createVideoCommentResponse = (comments: commentFromDb[]): VideoComment[] => {
  const commentsResponse = comments.map((comment: Comment) => {
    const { profile, username } = comment.author;
    if (!profile) {
      return {
        ...comment,
        author: {
          username,
        },
      };
    }
    const { avatar, firstName, lastName } = profile;
    return {
      ...comment,
      author: {
        avatar,
        firstName,
        username,
        lastName,
      },
    };
  });
  return commentsResponse;
};
