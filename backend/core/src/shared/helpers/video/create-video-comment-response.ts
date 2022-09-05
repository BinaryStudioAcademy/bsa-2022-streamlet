import { UserProfile } from '@prisma/client';
import { Comment } from 'shared/build';

type CommentWithAuthor = {
  id: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  author: { username: string; profile: UserProfile | null };
};

export const createVideoCommentResponse = (comments: CommentWithAuthor[]): Comment[] => {
  const commentsResponse = comments.map((comment) => {
    const { profile, username } = comment.author;
    return {
      ...comment,
      userName: username,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      avatar: profile?.avatar,
      dateAdded: comment.createdAt,
      likeNum: 0,
      dislikeNum: 0,
      commentReactions: [{ isLike: false, userId: '' }],
    };
  });
  return commentsResponse;
};
