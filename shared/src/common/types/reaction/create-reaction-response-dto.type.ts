type CreateReactionResponseDto = {
  id: string;
  likeNum: number;
  isLike: boolean | null;
  dislikeNum: number;
};

export { CreateReactionResponseDto };
