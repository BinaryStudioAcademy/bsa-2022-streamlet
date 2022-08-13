import { FC } from 'common/types/types';
import { IconName, FilterDate, FilterType, FilterDuration, SortBy } from 'common/enums/enums';
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
          options={FilterDate}
          activeFilterId={activeFilterDateId}
          onChangeFilterId={onChangeFilterDateId}
        />
        <FilterDropdown
          title="type"
          options={FilterType}
          activeFilterId={activeFilterTypeId}
          onChangeFilterId={onChangeFilterTypeId}
        />
        <FilterDropdown
          title="duration"
          options={FilterDuration}
          activeFilterId={activeFilterDurationId}
          onChangeFilterId={onChangeFilterDurationId}
        />
        <FilterSelect
          title="Sort by"
          options={SortBy}
          activeFilterId={activeSortById}
          onChangeFilterId={onChangeSortById}
        />
      </div>
    </div>
  );
};

export { FilterSidebar };
