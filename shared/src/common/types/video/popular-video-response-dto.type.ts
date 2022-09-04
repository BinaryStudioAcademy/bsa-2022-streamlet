import { VideoCard } from '~/common/types/components/video-card/video-card.type';

type PopularVideoResponseDto = {
  list: VideoCard[];
  currentPage: number;
  lastPage: number;
  category: string;
};

export { type PopularVideoResponseDto };
