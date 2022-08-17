import { SortByFilterId } from 'store/search/models';

const matchSortByFilterText: Record<SortByFilterId, string> = {
  [SortByFilterId.DEFAULT]: 'sort by',
  [SortByFilterId.RELEVANCE]: 'relevance',
  [SortByFilterId.UPLOAD_DATE]: 'upload date',
  [SortByFilterId.VIEW_COUNT]: 'view count',
  [SortByFilterId.RATING]: 'rating',
};

const allSortByFilters = [
  SortByFilterId.DEFAULT,
  SortByFilterId.RELEVANCE,
  SortByFilterId.UPLOAD_DATE,
  SortByFilterId.VIEW_COUNT,
  SortByFilterId.RATING,
].map((filterId) => ({
  id: filterId,
  text: matchSortByFilterText[filterId],
}));

export { SortByFilterId, allSortByFilters };
