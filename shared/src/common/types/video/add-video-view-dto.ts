export type AddVideoViewRequestDto = {
  videoId: string;
};

export type AddVideoViewResponseDto = {
  videoId: string;
  currentViews: number;
};
