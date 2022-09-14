import { UserProfile } from '@prisma/client';
import { Comment } from 'shared/build';

type CommentWithAuthor = {
  id: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  isEdited: boolean;
  isDeleted: boolean;
  author: { id: string; username: string; profile: UserProfile | null };
};

export const createVideoCommentResponse = (comments: CommentWithAuthor[]): Comment[] => {
  const commentsResponse = comments.map((comment) => {
    const { profile, username, id } = comment.author;
    return {
      ...comment,
      authorId: id,
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
