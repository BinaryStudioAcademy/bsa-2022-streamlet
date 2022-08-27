import { CategoryUpdateRequestDto } from 'shared/build';

export const normalizeCategoryUpdatePayload = ({
  name,
  posterBase64Str,
}: Omit<CategoryUpdateRequestDto, 'id'>): Omit<CategoryUpdateRequestDto, 'id'> => {
  return {
    name: name?.replace(/\s/g, '').toLowerCase(),
    posterBase64Str,
  };
};
