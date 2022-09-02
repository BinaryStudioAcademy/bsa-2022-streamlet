import { VideoCard } from '~/common/types/components/video-card/video-card.type';

type HistoryListType = {
  id: string;
  userId: string;
  videoId: string;
  video: VideoCard;
  createdAt: Date;
  updatedAt: Date;
};

type HistoryResponseDto = {
  list: HistoryListType[];
  currentPage: number;
  lastPage: number;
};

export { type HistoryResponseDto, type HistoryListType };
