import {
  FilterType,
  SearchQueryParam,
  TypeFilterId,
  DateFilterId,
  DurationFilterId,
  SortByFilterId,
  SearchState,
} from './config/config';

const matchSearchQueryParamWithFilterType: Record<SearchQueryParam, FilterType> = {
  [SearchQueryParam.TYPE]: FilterType.TYPE,
  [SearchQueryParam.DATE]: FilterType.DATE,
  [SearchQueryParam.DURATION]: FilterType.DURATION,
  [SearchQueryParam.SORT_BY]: FilterType.SORT_BY,
  [SearchQueryParam.SEARCH_TEXT]: FilterType.SEARCH_TEXT,
};

const matchSearchQueryParamWithDefaultFilterId: Record<
  SearchQueryParam,
  TypeFilterId | DateFilterId | DurationFilterId | SortByFilterId | string
> = {
  [SearchQueryParam.TYPE]: TypeFilterId.ALL,
  [SearchQueryParam.DATE]: DateFilterId.ANYTIME,
  [SearchQueryParam.DURATION]: DurationFilterId.ANY,
  [SearchQueryParam.SORT_BY]: SortByFilterId.DEFAULT,
  [SearchQueryParam.SEARCH_TEXT]: '',
};

const getFilterFromSearchParams = (
  searchParams: URLSearchParams,
): Partial<SearchState['activeFilterId']> & { [FilterType.SEARCH_TEXT]?: string } => {
  return Object.values(SearchQueryParam).reduce((prev, curr) => {
    if (searchParams.has(curr)) {
      return {
        ...prev,
        [matchSearchQueryParamWithFilterType[curr]]: searchParams.get(curr),
      };
    }
    return prev;
  }, {} as Partial<SearchState['activeFilterId']> & { [FilterType.SEARCH_TEXT]?: string });
};

export { matchSearchQueryParamWithFilterType, matchSearchQueryParamWithDefaultFilterId, getFilterFromSearchParams };
