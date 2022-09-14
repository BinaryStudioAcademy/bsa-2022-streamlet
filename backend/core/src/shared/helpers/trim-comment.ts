import { Comment } from 'shared/build';
import { CommentExpandedInfo } from '../types/types';
import { calculateReactions } from './calculate-reactions.helper';

export const trimComment = (comment: CommentExpandedInfo): Comment => {
  return {
    dateAdded: comment.createdAt,
    id: comment.id,
    parentId: comment.parentId,
    repliesCount: comment.repliesCount,
    text: comment.text,
    isEdited: comment.isEdited,
    isDeleted: comment.isDeleted,
    authorId: comment.author.id,
    userName: comment.author.username,
    avatar: comment.author.profile?.avatar,
    firstName: comment.author.profile?.firstName,
    lastName: comment.author.profile?.lastName,
    likeNum: calculateReactions(comment.commentReactions, true),
    dislikeNum: calculateReactions(comment.commentReactions, false),
    commentReactions: comment.commentReactions.map((item) => ({ isLike: item.isLike, userId: item.userId })),
  };
};
