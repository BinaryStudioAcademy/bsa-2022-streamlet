import { FC } from 'common/types/types';
import {
  IconName,
  FilterDate,
  FilterType,
  FilterDuration,
  SortBy,
  FilterDateValue,
  FilterTypeValue,
  FilterDurationValue,
  SortByValue,
} from 'common/enums/enums';
import { useEffect, useState, useId } from 'hooks/hooks';
import { Icon } from 'components/common/icon';
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
    if (!sidebar?.contains(e.target as HTMLElement)) setToggleAllFilters(false);
  };

  const onHandleScroll = (): void => setToggleAllFilters(false);

  const getSortByTitle = (): string => {
    if (activeSortById === SortByValue.DEFAULT) return 'sort by';
    return SortBy.filter((f) => f.value === activeSortById)[0].text;
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
          options={FilterDate.filter((f) => f.value !== FilterDateValue.ANYTIME)}
          activeFilterId={activeFilterDateId}
          onChangeFilterId={onChangeFilterDateId}
          defaultFilterId={FilterDateValue.ANYTIME}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
        <FilterDropdown
          title="type"
          options={FilterType.filter((f) => f.value !== FilterTypeValue.ALL)}
          activeFilterId={activeFilterTypeId}
          onChangeFilterId={onChangeFilterTypeId}
          defaultFilterId={FilterTypeValue.ALL}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
        <FilterDropdown
          title="duration"
          options={FilterDuration.filter((f) => f.value !== FilterDurationValue.ANY)}
          activeFilterId={activeFilterDurationId}
          onChangeFilterId={onChangeFilterDurationId}
          defaultFilterId={FilterDurationValue.ANY}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
        <FilterSelect
          title={getSortByTitle()}
          options={SortBy.filter((f) => f.value !== SortByValue.DEFAULT)}
          activeFilterId={activeSortById}
          onChangeFilterId={onChangeSortById}
          defaultFilterId={SortByValue.DEFAULT}
          toggleAllFilters={toggleAllFilters}
          onChangeToggleAllFilters={setToggleAllFilters}
        />
      </div>
    </div>
  );
};

export { FilterSidebar };
