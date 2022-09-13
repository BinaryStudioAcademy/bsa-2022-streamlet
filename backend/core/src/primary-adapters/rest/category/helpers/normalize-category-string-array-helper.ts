import { CategoryCreateRequestDto } from 'shared/build';
import { normalizeCategoryFiltersPayload } from './normalize-category-filters-helper';

export const normalizeCategoryStringArrayPayload = (categories: string[] | string): CategoryCreateRequestDto[] => {
  categories = typeof categories === 'string' ? [categories] : categories;
  return normalizeCategoryFiltersPayload(categories).map((category) => ({ name: category }));
};
