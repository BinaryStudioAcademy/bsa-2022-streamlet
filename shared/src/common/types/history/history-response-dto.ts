type VideoResponseDto = {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  videoViews: number;
  liveViews: number;
  channel: {
    id: string;
    name: string;
    bannerImage: string;
  };
};

type HistoryResponseDto = {
  id: string;
  userId: string;
  videoId: string;
  video: VideoResponseDto;
  createdAt: Date;
  updatedAt: Date;
};

export { type HistoryResponseDto, type VideoResponseDto };
