import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useEffect, useState, useId } from 'hooks/hooks';
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

import styles from './styles.module.scss';

type Props = {
  activeSortById: string;
  onChangeSortById: (value: string) => void;
  activeFilterTypeId: string;
  onChangeFilterTypeId: (value: string) => void;
  activeFilterDateId: string;
  onChangeFilterDateId: (value: string) => void;
  activeFilterDurationId: string;
  onChangeFilterDurationId: (value: string) => void;
};

const FilterSidebar: FC<Props> = ({
  activeSortById,
  onChangeSortById,
  activeFilterTypeId,
  onChangeFilterTypeId,
  activeFilterDateId,
  onChangeFilterDateId,
  activeFilterDurationId,
  onChangeFilterDurationId,
}) => {
  const [toggleAllFilters, setToggleAllFilters] = useState(false);

  const filterSidebarId = useId();

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
