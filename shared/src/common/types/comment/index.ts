import { BaseCommentReaction } from './base-comment-reaction';

type Comment = {
  id: string;
  parentId: string | null;
  avatar?: string;
  repliesCount?: number;
  userName: string;
  firstName?: string;
  lastName?: string;
  dateAdded: Date;
  text: string;
  likeNum: number;
  dislikeNum: number;
  commentReactions: BaseCommentReaction[];
};

export { Comment, BaseCommentReaction };
