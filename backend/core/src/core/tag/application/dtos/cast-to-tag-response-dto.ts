import { Tag } from '@prisma/client';
import { TagResponseDto } from 'shared/build';

export const castToTagResponseDto = ({ id, name }: Tag): TagResponseDto => {
  return {
    id,
    name,
  };
};
