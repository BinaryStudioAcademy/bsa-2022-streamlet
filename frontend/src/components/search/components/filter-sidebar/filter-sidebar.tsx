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
  return (
    <div className={styles['filter-sidebar']}>
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
        />
        <FilterDropdown
          title="type"
          options={FilterType.filter((f) => f.value !== FilterTypeValue.ALL)}
          activeFilterId={activeFilterTypeId}
          onChangeFilterId={onChangeFilterTypeId}
          defaultFilterId={FilterTypeValue.ALL}
        />
        <FilterDropdown
          title="duration"
          options={FilterDuration.filter((f) => f.value !== FilterDurationValue.ANY)}
          activeFilterId={activeFilterDurationId}
          onChangeFilterId={onChangeFilterDurationId}
          defaultFilterId={FilterDurationValue.ANY}
        />
        <FilterSelect
          title="Sort by"
          options={SortBy.filter((f) => f.value !== SortByValue.DEFAULT)}
          activeFilterId={activeSortById}
          onChangeFilterId={onChangeSortById}
          defaultFilterId={SortByValue.DEFAULT}
        />
      </div>
    </div>
  );
};

export { FilterSidebar };
