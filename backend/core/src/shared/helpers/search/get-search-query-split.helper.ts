const tsquerySpecialChars = /[()|&:*!]/g;

const getSearchQuerySplit = (searchQuery: string): string[] => {
  return searchQuery.replace(tsquerySpecialChars, ' ').trim().split(/\s+/);
};

export { getSearchQuerySplit };
