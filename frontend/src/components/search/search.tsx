import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { DataStatus, LoaderSize } from 'common/enums/enums';
import { useEffect, useSearchParams, useAppDispatch, useAppSelector, useCallback, useMemo } from 'hooks/hooks';
import { Loader } from 'components/common/common';
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
      results: { list, total, dataStatus },
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

  const handleSetSearchResults = useCallback(() => {
    dispatch(searchActions.setSearchResults({ searchParamURL: searchParams.toString() }));
  }, [searchParams, dispatch]);

  useEffect(() => {
    const currentFilterFromURL = getFilterFromSearchParams(searchParams);

    if (FilterType.SEARCH_TEXT in currentFilterFromURL) {
      handleSetSearchText(currentFilterFromURL[FilterType.SEARCH_TEXT] as string);
      delete currentFilterFromURL[FilterType.SEARCH_TEXT];
    }
    handleSetActiveFilterIds(currentFilterFromURL);
    handleSetSearchResults();
  }, [searchParams, handleSetSearchText, handleSetActiveFilterIds, handleSetSearchResults]);

  useEffect(() => {
    setSearchParams({ ...handleGetVideoFilter });
  }, [activeFilterId, setSearchParams, handleGetVideoFilter]);

  return (
    <div className={styles['search-page']}>
      <FilterBar />
      <div className={styles['search-page-wrapper']}>
        <FilterSidebar />
        <div className={styles['search-page-video-list']}>
          {dataStatus === DataStatus.PENDING ? (
            <Loader spinnerSize={LoaderSize.MD} />
          ) : (
            <>
              {(!searchText || total === 0) && <ResultNotFound />}
              {list.map((c: VideoCardType) => (
                <VideoCard key={c.id} video={c} isLightTheme={isLightTheme} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { Search };
