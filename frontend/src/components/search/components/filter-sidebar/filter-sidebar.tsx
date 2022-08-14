import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useEffect, useState, useId, useAppDispatch, useAppSelector, useCallback } from 'hooks/hooks';
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
} from 'components/search/config/config';
import { FilterDropdown, FilterSelect } from '../common/common';
import { searchActions } from 'store/actions';

import styles from './styles.module.scss';

const FilterSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: {
      activeFilterId: {
        type: activeTypeFilterId,
        date: activeDateFilterId,
        duration: activeDurationFilterId,
        sortBy: activeSortByFilterId,
      },
    },
  } = useAppSelector((state) => ({
    search: state.search,
  }));

  const [toggleAllFilters, setToggleAllFilters] = useState(false);

  const filterSidebarId = useId();

  const onChangeTypeFilterId = useCallback((v: string) => dispatch(searchActions.setActiveTypeFilterId(v)), [dispatch]);
  const onChangeDateFilterId = useCallback((v: string) => dispatch(searchActions.setActiveDateFilterId(v)), [dispatch]);
  const onChangeDurationFilterId = useCallback(
    (v: string) => dispatch(searchActions.setActiveDurationFilterId(v)),
    [dispatch],
  );
  const onChangeSortByFilterId = useCallback(
    (v: string) => dispatch(searchActions.setActiveSortByFilterId(v)),
    [dispatch],
  );

  const onHandleClickOutsideFilters = (e: MouseEvent): void => {
    const sidebar = document.getElementById(filterSidebarId);
    if (!sidebar?.contains(e.target as HTMLElement)) {
      setToggleAllFilters(false);
    }
  };

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
  }, [toggleAllFilters]);

  return (
    <div className={styles['filter-sidebar']} id={filterSidebarId}>
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
