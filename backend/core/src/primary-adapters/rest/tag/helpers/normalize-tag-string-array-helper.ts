import { TagCreateRequestDto } from 'shared/build';
import { normalizeTagFiltersPayload } from './normalize-tag-filters-helper';

export const normalizeTagStringArrayPayload = (tags: string[] | string): TagCreateRequestDto[] => {
  tags = typeof tags === 'string' ? [tags] : tags;
  return normalizeTagFiltersPayload(tags).map((tag) => ({ name: tag }));
};
