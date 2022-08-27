export const normalizeTagFiltersPayload = (tags: string[] | string): string[] => {
  tags = typeof tags === 'string' ? [tags] : tags;
  return tags.map((tag) => tag.replace(/\s/g, '').toLowerCase());
};
