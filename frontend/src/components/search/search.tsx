import { SearchQueryParam } from 'common/enums/enums';
import { FC } from 'common/types/types';
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

  const onHandleChangeFilterType = (v: string): void => {
    setFilterTypeValue(v);
    setSearchParams({ ...Object.fromEntries([...searchParams]), [SearchQueryParam.TYPE]: v });
  };

  const onHandleChangeFilterDate = (v: string): void => {
    setFilterDateValue(v);
    setSearchParams({ ...Object.fromEntries([...searchParams]), [SearchQueryParam.DATE]: v });
  };

  const onHandleChangeFilterDuration = (v: string): void => {
    setFilterDurationValue(v);
    setSearchParams({ ...Object.fromEntries([...searchParams]), [SearchQueryParam.DURATION]: v });
  };

  const onHandleChangeSortBy = (v: string): void => {
    setSortByValue(v);
    setSearchParams({ ...Object.fromEntries([...searchParams]), [SearchQueryParam.SORT_BY]: v });
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
        {isFilterShown ? (
          <FilterBar
            filterType={filterTypeValue}
            onChangeFilterType={onHandleChangeFilterType}
            filterDate={filterDateValue}
            onChangeFilterDate={onHandleChangeFilterDate}
          />
        ) : null}
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
            {[].map((c) => (
              <VideoCard
                key={c.id}
                id={c.id}
                name={c.name}
                duration={c.duration}
                createdAt={c.createdAt}
                preview={c.preview}
                videoViews={c.videoViews}
                channel={c.channel}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { Search };
