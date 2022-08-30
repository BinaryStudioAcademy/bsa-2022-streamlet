import { TagCreateRequestDto } from 'shared/build';

export const normalizeTagPayload = ({ name }: TagCreateRequestDto): TagCreateRequestDto => {
  return {
    name: name.replace(/\s/g, '').toLowerCase(),
  };
};
