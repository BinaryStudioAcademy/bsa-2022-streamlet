import { Video } from '@prisma/client';
import { PopularVideoResponseDto } from 'shared/build';
import { trimVideoToBase } from '~/shared/helpers/trim-video';

export const trimPopular = (
  videos: (Video & {
    categories: {
      name: string;
    }[];
    channel: {
      id: string;
      name: string;
      avatar: string;
    };
  })[],
  lastPage: number,
  currentPage: number,
): PopularVideoResponseDto => {
  return {
    list: videos.map((video) => {
      return trimVideoToBase(video);
    }),
    currentPage,
    lastPage,
  };
};
