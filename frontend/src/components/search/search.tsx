import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { useEffect, useSearchParams, useAppDispatch, useAppSelector, useCallback } from 'hooks/hooks';
import { FilterBar, FilterSidebar, ResultNotFound, VideoCard } from './components/components';
import { SearchQueryParam, FilterType, SearchState } from './config/config';
import { searchActions } from 'store/actions';
import { matchSearchQueryParamWithFilterType, matchSearchQueryParamWithDefaultFilterId } from './helpers';

import styles from './styles.module.scss';

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: {
      searchText,
      activeFilterId,
      results: { results },
    },
  } = useAppSelector((state) => ({
    search: state.search,
  }));

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetSearchText = useCallback((v: string) => dispatch(searchActions.setSearchText(v)), [dispatch]);
  const handleSetActiveFilterIds = useCallback(
    (filterIds: Partial<SearchState['activeFilterId']>) => dispatch(searchActions.setActiveFilterIds(filterIds)),
    [dispatch],
  );

  const handleGetVideoFilter = useCallback((): Partial<Record<SearchQueryParam, string>> => {
    const currentSearchState = {
      [FilterType.SEARCH_TEXT]: searchText,
      ...activeFilterId,
    };
    return Object.values(SearchQueryParam).reduce((prev, curr) => {
      const currId = currentSearchState[matchSearchQueryParamWithFilterType[curr]];
      const defaultId = matchSearchQueryParamWithDefaultFilterId[curr];
      if (currId !== defaultId) {
        return {
          ...prev,
          [curr]: currId,
        };
      }
      return prev;
    }, {});
    // eslint-disable-next-line
  }, [activeFilterId]);

  const handleSetSearchParams = useCallback(() => {
    setSearchParams({ ...handleGetVideoFilter() });
  }, [setSearchParams, handleGetVideoFilter]);

  useEffect(() => {
    const currentFilterFromURL = Object.values(SearchQueryParam).reduce((prev, curr) => {
      if (searchParams.has(curr)) {
        return {
          ...prev,
          [matchSearchQueryParamWithFilterType[curr]]: searchParams.get(curr),
        };
      }
      return prev;
    }, {} as Partial<SearchState['activeFilterId']> & { [FilterType.SEARCH_TEXT]?: string });

    if (FilterType.SEARCH_TEXT in currentFilterFromURL) {
      handleSetSearchText(currentFilterFromURL[FilterType.SEARCH_TEXT] as string);
      delete currentFilterFromURL[FilterType.SEARCH_TEXT];
    }
    handleSetActiveFilterIds(currentFilterFromURL);
  }, [searchParams, handleSetSearchText, handleSetActiveFilterIds]);

  useEffect(() => {
    handleSetSearchParams();
  }, [activeFilterId, handleSetSearchParams]);

  return (
    <div className={styles['search-page']}>
      <FilterBar />
      <div className={styles['search-page-wrapper']}>
        <FilterSidebar />
        <div className={styles['search-page-video-list']}>
          {results.length === 0 && <ResultNotFound />}
          {results.map((c: VideoCardType) => (
            <VideoCard key={c.id} video={c} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Search };
