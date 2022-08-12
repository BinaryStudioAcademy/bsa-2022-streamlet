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

  const onHandleSetSearchParams = (prop: string, value: string): void => {
    setSearchParams({ ...Object.fromEntries([...searchParams]), [prop]: value });
  };

  const onHandleChangeFilterType = (v: string): void => {
    setFilterTypeValue(v);
    onHandleSetSearchParams(SearchQueryParam.TYPE, v);
  };

  const onHandleChangeFilterDate = (v: string): void => {
    setFilterDateValue(v);
    onHandleSetSearchParams(SearchQueryParam.DATE, v);
  };

  const onHandleChangeFilterDuration = (v: string): void => {
    setFilterDurationValue(v);
    onHandleSetSearchParams(SearchQueryParam.DURATION, v);
  };

  const onHandleChangeSortBy = (v: string): void => {
    setSortByValue(v);
    onHandleSetSearchParams(SearchQueryParam.SORT_BY, v);
  };

  const onOpenFilterHandler = useCallback(() => dispatch(searchActions.toggleShowFilter()), [dispatch]);

  useEffect(() => {
    setFilterTypeValue(searchParams.get(SearchQueryParam.TYPE) || '');
    setFilterDateValue(searchParams.get(SearchQueryParam.DATE) || '');
    setFilterDurationValue(searchParams.get(SearchQueryParam.DURATION) || '');
    setSortByValue(searchParams.get(SearchQueryParam.SORT_BY) || '');
  }, []);

  return (
    <>
      <span onClick={onOpenFilterHandler}> {isFilterShown ? 'close' : 'open'} FilterBar</span>
      <div className={styles['search-page']}>
        {isFilterShown && (
          <FilterBar
            filterType={filterTypeValue}
            onChangeFilterType={onHandleChangeFilterType}
            filterDate={filterDateValue}
            onChangeFilterDate={onHandleChangeFilterDate}
          />
        )}
        <div className={styles['search-page-wrapper']}>
          <FilterSidebar
            filterType={filterTypeValue}
            onChangeFilterType={onHandleChangeFilterType}
            filterDate={filterDateValue}
            onChangeFilterDate={onHandleChangeFilterDate}
            filterDuration={filterDurationValue}
            onChangeFilterDuration={onHandleChangeFilterDuration}
            sortBy={sortByValue}
            onChangeSortBy={onHandleChangeSortBy}
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
