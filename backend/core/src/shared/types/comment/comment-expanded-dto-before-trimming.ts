import { CommentReaction, User, UserProfile, VideoComment } from '@prisma/client';

export type CommentExpandedInfo = VideoComment & {
  author: User & {
    profile: UserProfile | null;
  };
  commentReactions: CommentReaction[];
  _count: {
    childComments: number;
  };
  repliesCount: number;
};
