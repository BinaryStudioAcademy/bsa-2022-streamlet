import { Reaction } from '@prisma/client';
import { CreateReactionResponseDto } from 'shared/build';

const createAddReactionResponse = (
  reaction: Reaction,
  likeNum: number,
  disLikeNum: number,
): CreateReactionResponseDto => {
  const { id } = reaction;
  return {
    id,
    likeNum,
    disLikeNum,
  };
};

export { createAddReactionResponse };
