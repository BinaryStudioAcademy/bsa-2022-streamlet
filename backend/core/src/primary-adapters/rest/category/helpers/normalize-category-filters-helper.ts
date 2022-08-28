export const normalizeCategoryFiltersPayload = (categories: string[] | string): string[] => {
  categories = typeof categories === 'string' ? [categories] : categories;
  return categories.map((categories) => categories.replace(/\s/g, '').toLowerCase());
};
