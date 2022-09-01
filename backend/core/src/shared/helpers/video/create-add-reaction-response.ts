import { Reaction, CommentReaction } from '@prisma/client';
import { CreateReactionResponseDto } from 'shared/build';

const createAddReactionResponse = (
  reaction: Reaction | CommentReaction | null,
  likeNum: number,
  dislikeNum: number,
): CreateReactionResponseDto => {
  if (reaction) {
    const { id, isLike } = reaction;
    return {
      id,
      isLike,
      likeNum,
      dislikeNum,
    };
  }
  return {
    id: '',
    isLike: null,
    likeNum,
    dislikeNum,
  };
};

export { createAddReactionResponse };
