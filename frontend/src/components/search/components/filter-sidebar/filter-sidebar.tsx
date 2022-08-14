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
        type: activeFilterTypeId,
        date: activeFilterDateId,
        duration: activeFilterDurationId,
        sortBy: activeSortById,
      },
    },
  } = useAppSelector((state) => ({
    search: state.search,
  }));

  const [toggleAllFilters, setToggleAllFilters] = useState(false);

  const filterSidebarId = useId();

  const onChangeFilterTypeId = useCallback((v: string) => dispatch(searchActions.setActiveTypeFilterId(v)), [dispatch]);
  const onChangeFilterDateId = useCallback((v: string) => dispatch(searchActions.setActiveDateFilterId(v)), [dispatch]);
  const onChangeFilterDurationId = useCallback(
    (v: string) => dispatch(searchActions.setActiveDurationFilterId(v)),
    [dispatch],
  );
  const onChangeSortById = useCallback((v: string) => dispatch(searchActions.setActiveSortByFilterId(v)), [dispatch]);

  const onHandleClickOutsideFilters = (e: MouseEvent): void => {
    const sidebar = document.getElementById(filterSidebarId);
    if (!sidebar?.contains(e.target as HTMLElement)) {
      setToggleAllFilters(false);
    }
  };

  const onHandleScroll = (): void => setToggleAllFilters(false);

  const getSortByTitle = (): string => {
    return allSortByFilters.find((f) => f.id === activeSortById)?.text || 'sort by';
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
          activeFilterId={activeFilterDateId}
          onChangeFilterId={onChangeFilterDateId}
          defaultFilterId={DateFilterId.ANYTIME}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
        <FilterDropdown
          title="type"
          options={allTypeFilters.filter((f) => f.id !== TypeFilterId.ALL)}
          activeFilterId={activeFilterTypeId}
          onChangeFilterId={onChangeFilterTypeId}
          defaultFilterId={TypeFilterId.ALL}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
        <FilterDropdown
          title="duration"
          options={allDurationFilters.filter((f) => f.id !== DurationFilterId.ANY)}
          activeFilterId={activeFilterDurationId}
          onChangeFilterId={onChangeFilterDurationId}
          defaultFilterId={DurationFilterId.ANY}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
        <FilterSelect
          title={getSortByTitle()}
          options={allSortByFilters.filter((f) => f.id !== SortByFilterId.DEFAULT)}
          activeFilterId={activeSortById}
          onChangeFilterId={onChangeSortById}
          defaultFilterId={SortByFilterId.DEFAULT}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
      </div>
    </div>
  );
};

export { FilterSidebar };
