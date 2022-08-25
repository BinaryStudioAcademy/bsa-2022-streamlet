import { Video } from '@prisma/client';
import { SearchByCategoryResponseDto } from 'shared/build';

export const castToSearchByCategoryResponseDto = ({
  id,
  name,
  description,
  status,
  videoPath,
  liveViews,
  videoViews,
}: Video): SearchByCategoryResponseDto => {
  return {
    id,
    name,
    description,
    status,
    videoPath,
    liveViews,
    videoViews,
  };
};
