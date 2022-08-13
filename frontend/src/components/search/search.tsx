import { SearchQueryParam } from 'common/enums/enums';
import { FC, VideoCard as VideoCardType } from 'common/types/types';
import { useAppDispatch, useAppSelector, useState, useCallback, useEffect, useSearchParams } from 'hooks/hooks';
import { searchActions } from 'store/actions';
import { FilterBar, FilterSidebar, VideoCard } from './components/components';

import styles from './styles.module.scss';

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: { isFilterShown },
  } = useAppSelector((state) => ({
    search: state.search,
  }));
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterTypeValue, setFilterTypeValue] = useState('');
  const [filterDateValue, setFilterDateValue] = useState('');
  const [filterDurationValue, setFilterDurationValue] = useState('');
  const [sortByValue, setSortByValue] = useState('');

  const onOpenFilterHandler = useCallback(() => dispatch(searchActions.toggleShowFilter()), [dispatch]);

  const handleSetSearchParams = (): void => {
    const videoFilter = {
      ...(filterTypeValue && { [SearchQueryParam.TYPE]: filterTypeValue }),
      ...(filterDateValue && { [SearchQueryParam.DATE]: filterDateValue }),
      ...(filterDurationValue && { [SearchQueryParam.DURATION]: filterDurationValue }),
      ...(sortByValue && { [SearchQueryParam.SORT_BY]: sortByValue }),
    };
    setSearchParams({ ...Object.fromEntries([...searchParams]), ...videoFilter });
  };

  useEffect(() => {
    setFilterTypeValue(searchParams.get(SearchQueryParam.TYPE) || '');
    setFilterDateValue(searchParams.get(SearchQueryParam.DATE) || '');
    setFilterDurationValue(searchParams.get(SearchQueryParam.DURATION) || '');
    setSortByValue(searchParams.get(SearchQueryParam.SORT_BY) || '');
  }, []);

  useEffect(() => {
    handleSetSearchParams();
  }, [filterTypeValue, filterDateValue, filterDurationValue, sortByValue]);

  return (
    <>
      <span onClick={onOpenFilterHandler}> {isFilterShown ? 'close' : 'open'} FilterBar</span>
      <div className={styles['search-page']}>
        {isFilterShown && (
          <FilterBar
            filterType={filterTypeValue}
            onChangeFilterType={setFilterTypeValue}
            filterDate={filterDateValue}
            onChangeFilterDate={setFilterDateValue}
          />
        )}
        <div className={styles['search-page-wrapper']}>
          <FilterSidebar
            filterType={filterTypeValue}
            onChangeFilterType={setFilterTypeValue}
            filterDate={filterDateValue}
            onChangeFilterDate={setFilterDateValue}
            filterDuration={filterDurationValue}
            onChangeFilterDuration={setFilterDurationValue}
            sortBy={sortByValue}
            onChangeSortBy={setSortByValue}
          />
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
