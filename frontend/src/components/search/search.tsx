import { FC, VideoCard as VideoCardType, SearchQueryParamDto } from 'common/types/types';
import { useEffect, useSearchParams, useAppDispatch, useAppSelector, useCallback } from 'hooks/hooks';
import { FilterBar, FilterSidebar, VideoCard } from './components/components';
import { TypeFilterId, DateFilterId, DurationFilterId, SortByFilterId, SearchQueryParam } from './config/config';
import { searchActions } from 'store/actions';

import styles from './styles.module.scss';

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: {
      searchText,
      activeFilterId: {
        type: activeFilterTypeId,
        date: activeFilterDateId,
        duration: activeFilterDurationId,
        sortBy: activeSortById,
      },
    },
  } = useAppSelector((state) => ({
    search: state.search,
  }));

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetSearchText = useCallback((v: string) => dispatch(searchActions.setSearchText(v)), [dispatch]);
  const handleSetActiveTypeFilterId = useCallback(
    (v: string) => dispatch(searchActions.setActiveTypeFilterId(v)),
    [dispatch],
  );
  const handleSetActiveDateFilterId = useCallback(
    (v: string) => dispatch(searchActions.setActiveDateFilterId(v)),
    [dispatch],
  );
  const handleSetActiveDurationFilterId = useCallback(
    (v: string) => dispatch(searchActions.setActiveDurationFilterId(v)),
    [dispatch],
  );
  const handleSetActiveSortByFilterId = useCallback(
    (v: string) => dispatch(searchActions.setActiveSortByFilterId(v)),
    [dispatch],
  );

  const handleGetVideoFilter = (): SearchQueryParamDto => ({
    ...(activeFilterTypeId !== TypeFilterId.ALL && { [SearchQueryParam.TYPE]: activeFilterTypeId }),
    ...(activeFilterDateId !== DateFilterId.ANYTIME && { [SearchQueryParam.DATE]: activeFilterDateId }),
    ...(activeFilterDurationId !== DurationFilterId.ANY && { [SearchQueryParam.DURATION]: activeFilterDurationId }),
    ...(activeSortById !== SortByFilterId.DEFAULT && { [SearchQueryParam.SORT_BY]: activeSortById }),
    ...(searchText && { [SearchQueryParam.SEARCH_TEXT]: searchText }),
  });

  const handleSetSearchParams = (): void => setSearchParams({ ...handleGetVideoFilter() });

  useEffect(() => {
    if (searchParams.has(SearchQueryParam.SEARCH_TEXT)) {
      handleSetSearchText(searchParams.get(SearchQueryParam.SEARCH_TEXT) as string);
    }
    if (searchParams.has(SearchQueryParam.TYPE)) {
      handleSetActiveTypeFilterId(searchParams.get(SearchQueryParam.TYPE) as string);
    }
    if (searchParams.has(SearchQueryParam.DATE)) {
      handleSetActiveDateFilterId(searchParams.get(SearchQueryParam.DATE) as string);
    }
    if (searchParams.has(SearchQueryParam.DURATION)) {
      handleSetActiveDurationFilterId(searchParams.get(SearchQueryParam.DURATION) as string);
    }
    if (searchParams.has(SearchQueryParam.SORT_BY)) {
      handleSetActiveSortByFilterId(searchParams.get(SearchQueryParam.SORT_BY) as string);
    }
  }, []);

  useEffect(() => {
    handleSetSearchParams();
  }, [searchText, activeFilterTypeId, activeFilterDateId, activeFilterDurationId, activeSortById]);

  return (
    <>
      <div className={styles['search-page']}>
        <FilterBar />
        <div className={styles['search-page-wrapper']}>
          <FilterSidebar />
          <div className={styles['search-page-video-list']}>
            {[].map((c: VideoCardType) => (
              <VideoCard key={c.id} video={c} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { Search };
