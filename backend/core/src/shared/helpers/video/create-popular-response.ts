import { Category, Video } from '@prisma/client';
import { PopularVideoResponseDto } from 'shared/build';
import { trimVideoToBase } from '~/shared/helpers/trim-video';

export const trimPopular = (
  videos: (Video & {
    categories: {
      category: Category;
    }[];
    channel: {
      id: string;
      name: string;
      avatar: string;
    };
  })[],
  lastPage: number,
  currentPage: number,
  category: string,
): PopularVideoResponseDto => {
  return {
    list: videos.map((video) => {
      return trimVideoToBase(video);
    }),
    currentPage,
    lastPage,
    category,
  };
};
