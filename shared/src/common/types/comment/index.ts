import { BaseCommentReaction } from './base-comment-reaction';

type Comment = {
  id: string;
  parentId: string | null;
  avatar?: string;
  repliesCount?: number;
  authorId: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  dateAdded: Date;
  text: string;
  isEdited: boolean;
  isDeleted: boolean;
  likeNum: number;
  dislikeNum: number;
  commentReactions: BaseCommentReaction[];
};

export { DeleteCommentResponseDto } from './delete-comment-response-dto.type';
export { Comment, BaseCommentReaction };
