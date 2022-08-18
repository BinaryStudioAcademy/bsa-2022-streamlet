type VideoBaseResponseDto = {
  id: string;
  name: string;
  description: string;
  likeNum: number;
  disLikeNum: number;
  liveViews: number;
  isLive: boolean;
  videoViews: number;
  createdAt: string;
  channelId: string;
};

export { type VideoBaseResponseDto };
