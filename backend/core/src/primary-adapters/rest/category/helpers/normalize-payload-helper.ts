import { CategoryCreateRequestDto } from 'shared/build';

export const normalizeCategoryPayload = ({ name }: CategoryCreateRequestDto): CategoryCreateRequestDto => {
  return {
    name: name.replace(/\s/g, '').toLowerCase(),
  };
};
