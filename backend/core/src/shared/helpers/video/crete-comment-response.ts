import { UserProfile } from '@prisma/client';
import { VideoComment } from 'shared/build/common/types/video/video-coment';
import { type commentFromDb } from './types/types';
type Comment = { id: string; createdAt: Date; updatedAt: Date; text: string; author: { profile: UserProfile | null } };

export const createVideoCommentResponse = (comments: commentFromDb[]): VideoComment[] => {
  const commentsResponse = comments.map((comment: Comment) => {
    const { profile } = comment.author;
    if (!profile) {
      return {
        ...comment,
        author: {
          username: 'anonimus',
        },
      };
    }
    const { avatar, firstName, lastName } = profile;
    return {
      ...comment,
      author: {
        avatar,
        firstName,
        username: 'anonimus',
        lastName,
      },
    };
  });
  return commentsResponse;
};
