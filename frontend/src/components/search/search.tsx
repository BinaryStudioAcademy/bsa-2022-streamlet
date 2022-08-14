import {
  SearchQueryParam,
  FilterDateValue,
  FilterTypeValue,
  FilterDurationValue,
  SortByValue,
} from 'common/enums/enums';
import { FC, VideoCard as VideoCardType, SearchQueryParamDto } from 'common/types/types';
import { useState, useEffect, useSearchParams } from 'hooks/hooks';
import { FilterBar, FilterSidebar, VideoCard } from './components/components';

import styles from './styles.module.scss';

const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterTypeValue, setFilterTypeValue] = useState(FilterTypeValue.ALL as string);
  const [filterDateValue, setFilterDateValue] = useState(FilterDateValue.ANYTIME as string);
  const [filterDurationValue, setFilterDurationValue] = useState(FilterDurationValue.ANY as string);
  const [sortByValue, setSortByValue] = useState(SortByValue.DEFAULT as string);

  const handleGetVideoFilter = (): SearchQueryParamDto => ({
    ...(filterTypeValue !== FilterTypeValue.ALL && { [SearchQueryParam.TYPE]: filterTypeValue }),
    ...(filterDateValue !== FilterDateValue.ANYTIME && { [SearchQueryParam.DATE]: filterDateValue }),
    ...(filterDurationValue !== FilterDurationValue.ANY && { [SearchQueryParam.DURATION]: filterDurationValue }),
    ...(sortByValue !== SortByValue.DEFAULT && { [SearchQueryParam.SORT_BY]: sortByValue }),
  });

  const handleSetSearchParams = (): void => setSearchParams({ ...handleGetVideoFilter() });

  useEffect(() => {
    if (searchParams.has(SearchQueryParam.TYPE)) {
      setFilterTypeValue(searchParams.get(SearchQueryParam.TYPE) as string);
    }
    if (searchParams.has(SearchQueryParam.DATE)) {
      setFilterTypeValue(searchParams.get(SearchQueryParam.DATE) as string);
    }
    if (searchParams.has(SearchQueryParam.DURATION)) {
      setFilterTypeValue(searchParams.get(SearchQueryParam.DURATION) as string);
    }
    if (searchParams.has(SearchQueryParam.SORT_BY)) {
      setFilterTypeValue(searchParams.get(SearchQueryParam.SORT_BY) as string);
    }
  }, []);

  useEffect(() => {
    handleSetSearchParams();
  }, [filterTypeValue, filterDateValue, filterDurationValue, sortByValue]);

  return (
    <>
      <div className={styles['search-page']}>
        <FilterBar
          activeFilterTypeId={filterTypeValue}
          onChangeFilterTypeId={setFilterTypeValue}
          activeFilterDateId={filterDateValue}
          onChangeFilterDateId={setFilterDateValue}
        />
        <div className={styles['search-page-wrapper']}>
          <FilterSidebar
            activeFilterTypeId={filterTypeValue}
            onChangeFilterTypeId={setFilterTypeValue}
            activeFilterDateId={filterDateValue}
            onChangeFilterDateId={setFilterDateValue}
            activeFilterDurationId={filterDurationValue}
            onChangeFilterDurationId={setFilterDurationValue}
            activeSortById={sortByValue}
            onChangeSortById={setSortByValue}
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
