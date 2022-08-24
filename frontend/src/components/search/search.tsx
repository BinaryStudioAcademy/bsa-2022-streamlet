import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { useEffect, useSearchParams, useAppDispatch, useAppSelector, useCallback, useMemo } from 'hooks/hooks';
import { FilterBar, FilterSidebar, ResultNotFound, VideoCard } from './components/components';
import { SearchQueryParam, FilterType, SearchState } from './config/config';
import { searchActions } from 'store/actions';
import {
  matchSearchQueryParamWithFilterType,
  matchSearchQueryParamWithDefaultFilterId,
  getFilterFromSearchParams,
} from './helpers';

import styles from './styles.module.scss';

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: {
      searchText,
      activeFilterId,
      results: { results },
    },
    theme: { isLightTheme },
  } = useAppSelector((state) => ({
    search: state.search,
    theme: state.theme,
  }));

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetSearchText = useCallback((v: string) => dispatch(searchActions.setSearchText(v)), [dispatch]);
  const handleSetActiveFilterIds = useCallback(
    (filterIds: Partial<SearchState['activeFilterId']>) => dispatch(searchActions.setActiveFilterIds(filterIds)),
    [dispatch],
  );

  const handleGetVideoFilter = useMemo((): Partial<Record<SearchQueryParam, string>> => {
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
  }, [searchText, activeFilterId]);

  useEffect(() => {
    const currentFilterFromURL = getFilterFromSearchParams(searchParams);

    if (FilterType.SEARCH_TEXT in currentFilterFromURL) {
      handleSetSearchText(currentFilterFromURL[FilterType.SEARCH_TEXT] as string);
      delete currentFilterFromURL[FilterType.SEARCH_TEXT];
    }
    handleSetActiveFilterIds(currentFilterFromURL);
  }, [searchParams, handleSetSearchText, handleSetActiveFilterIds]);

  useEffect(() => {
    setSearchParams({ ...handleGetVideoFilter });
  }, [activeFilterId, setSearchParams, handleGetVideoFilter]);

  return (
    <div className={styles['search-page']}>
      <FilterBar />
      <div className={styles['search-page-wrapper']}>
        <FilterSidebar />
        <div className={styles['search-page-video-list']}>
          {results.length === 0 && <ResultNotFound />}
          {results.map((c: VideoCardType) => (
            <VideoCard key={c.id} video={c} isLightTheme={isLightTheme} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Search };
