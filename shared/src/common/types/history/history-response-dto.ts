import { VideoCard } from '~/common/types/components/video-card/video-card.type';

type HistoryResponseDto = {
  id: string;
  userId: string;
  videoId: string;
  video: VideoCard;
  createdAt: Date;
  updatedAt: Date;
};

export { type HistoryResponseDto };
