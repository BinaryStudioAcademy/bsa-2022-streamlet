import { Category } from '@prisma/client';
import { CategoryResponseDto } from 'shared/build';

export const castToCategoryResponseDto = ({ id, name, posterPath }: Category): CategoryResponseDto => {
  return {
    id,
    name,
    posterPath: posterPath,
  };
};
