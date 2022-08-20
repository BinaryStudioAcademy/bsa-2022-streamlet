import { Reaction } from '@prisma/client';
import { CreateReactionResponseDto } from 'shared/build';

const createAddReactionResponse = (
  reaction: Reaction | null,
  likeNum: number,
  disLikeNum: number,
): CreateReactionResponseDto => {
  if (reaction) {
    const { id, isLike } = reaction;
    return {
      id,
      isLike,
      likeNum,
      disLikeNum,
    };
  }
  return {
    id: '',
    isLike: null,
    likeNum,
    disLikeNum,
  };
};

export { createAddReactionResponse };
