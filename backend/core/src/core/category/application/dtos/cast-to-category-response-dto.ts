import { Category } from '@prisma/client';
import { CategoryResponseDto } from 'shared/build';

export const castToCategoryResponseDto = ({ id, name }: Category): CategoryResponseDto => {
  return {
    id,
    name,
  };
};
