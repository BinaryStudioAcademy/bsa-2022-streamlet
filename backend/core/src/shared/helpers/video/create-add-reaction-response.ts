import { Reaction } from '@prisma/client';
import { CreateReactionResponseDto } from 'shared/build';

const createAddReactionResponse = (
  reaction: Reaction | undefined = undefined,
  likeNum: number,
  disLikeNum: number,
): CreateReactionResponseDto => {
  if (reaction) {
    const { id } = reaction;
    return {
      id,
      likeNum,
      disLikeNum,
    };
  }
  return {
    id: '',
    likeNum,
    disLikeNum,
  };
};

export { createAddReactionResponse };
