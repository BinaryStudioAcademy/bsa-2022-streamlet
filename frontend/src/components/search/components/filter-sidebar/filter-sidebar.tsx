import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useEffect, useState, useAppDispatch, useAppSelector, useCallback, useRef } from 'hooks/hooks';
import { Icon } from 'components/common/icon';
import {
  TypeFilterId,
  allTypeFilters,
  DateFilterId,
  allDateFilters,
  DurationFilterId,
  allDurationFilters,
  SortByFilterId,
  allSortByFilters,
  SearchState,
  FilterType,
} from 'components/search/config/config';
import { FilterDropdown, FilterSelect } from '../common/common';
import { searchActions } from 'store/actions';

import styles from './styles.module.scss';

const FilterSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: {
      activeFilterId: {
        [FilterType.TYPE]: activeTypeFilterId,
        [FilterType.DATE]: activeDateFilterId,
        [FilterType.DURATION]: activeDurationFilterId,
        [FilterType.SORT_BY]: activeSortByFilterId,
      },
    },
  } = useAppSelector((state) => ({
    search: state.search,
  }));

  const [toggleAllFilters, setToggleAllFilters] = useState(false);

  const filterSidebarEl = useRef<HTMLDivElement>(null);

  const onChangeActiveFilterIds = useCallback(
    (filterIds: Partial<SearchState['activeFilterId']>) => dispatch(searchActions.setActiveFilterIds(filterIds)),
    [dispatch],
  );

  const onChangeTypeFilterId = useCallback(
    (id: string) => onChangeActiveFilterIds({ [FilterType.TYPE]: id as TypeFilterId }),
    [onChangeActiveFilterIds],
  );
  const onChangeDateFilterId = useCallback(
    (id: string) => onChangeActiveFilterIds({ [FilterType.DATE]: id as DateFilterId }),
    [onChangeActiveFilterIds],
  );
  const onChangeDurationFilterId = useCallback(
    (id: string) => onChangeActiveFilterIds({ [FilterType.DURATION]: id as DurationFilterId }),
    [onChangeActiveFilterIds],
  );
  const onChangeSortByFilterId = useCallback(
    (id: string) => onChangeActiveFilterIds({ [FilterType.SORT_BY]: id as SortByFilterId }),
    [onChangeActiveFilterIds],
  );

  const onHandleClickOutsideFilters = useCallback((e: MouseEvent): void => {
    if (!filterSidebarEl.current?.contains(e.target as HTMLElement)) {
      setToggleAllFilters(false);
    }
  }, []);

  const onHandleScroll = (): void => setToggleAllFilters(false);

  const getSortByTitle = (): string => {
    return allSortByFilters.find((f) => f.id === activeSortByFilterId)?.text || 'sort by';
  };

  useEffect(() => {
    if (toggleAllFilters) {
      window.addEventListener('click', onHandleClickOutsideFilters);
      window.addEventListener('scroll', onHandleScroll);
    }
    return () => {
      window.removeEventListener('click', onHandleClickOutsideFilters);
      window.removeEventListener('scroll', onHandleScroll);
    };
  }, [toggleAllFilters, onHandleClickOutsideFilters]);

  return (
    <div className={styles['filter-sidebar']} ref={filterSidebarEl}>
      <div className={styles['filter-sidebar-title']}>
        <Icon name={IconName.FILTER} />
        <span>filters</span>
      </div>
      <div className={styles['filter-sidebar-wrapper']}>
        <FilterDropdown
          title="date"
          options={allDateFilters.filter((f) => f.id !== DateFilterId.ANYTIME)}
          activeFilterId={activeDateFilterId}
          onChangeFilterId={onChangeDateFilterId}
          defaultFilterId={DateFilterId.ANYTIME}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
        <FilterDropdown
          title="type"
          options={allTypeFilters.filter((f) => f.id !== TypeFilterId.ALL)}
          activeFilterId={activeTypeFilterId}
          onChangeFilterId={onChangeTypeFilterId}
          defaultFilterId={TypeFilterId.ALL}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
        <FilterDropdown
          title="duration"
          options={allDurationFilters.filter((f) => f.id !== DurationFilterId.ANY)}
          activeFilterId={activeDurationFilterId}
          onChangeFilterId={onChangeDurationFilterId}
          defaultFilterId={DurationFilterId.ANY}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
        <FilterSelect
          title={getSortByTitle()}
          options={allSortByFilters.filter((f) => f.id !== SortByFilterId.DEFAULT)}
          activeFilterId={activeSortByFilterId}
          onChangeFilterId={onChangeSortByFilterId}
          defaultFilterId={SortByFilterId.DEFAULT}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
      </div>
    </div>
  );
};

export { FilterSidebar };
