import { Video } from '@prisma/client';
import { SearchByTagResponseDto } from 'shared/build';

export const castToSearchByTagResponseDto = ({
  id,
  name,
  description,
  status,
  videoPath,
  liveViews,
  videoViews,
}: Video): SearchByTagResponseDto => {
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
