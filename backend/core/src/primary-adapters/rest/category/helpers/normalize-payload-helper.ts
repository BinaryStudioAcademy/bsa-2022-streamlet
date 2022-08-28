import { CategoryCreateRequestDto } from 'shared/build';

export const normalizeCategoryPayload = ({
  name,
  posterBase64Str,
}: CategoryCreateRequestDto): CategoryCreateRequestDto => {
  return {
    name: name.replace(/\s/g, '').toLowerCase(),
    posterBase64Str,
  };
};
