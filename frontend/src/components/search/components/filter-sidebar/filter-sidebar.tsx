import { FC } from 'common/types/types';
import { IconName, FilterDate, FilterType, FilterDuration, SortBy } from 'common/enums/enums';
import { Icon } from 'components/common/icon';
import { FilterDropdown, FilterSelect } from '../common/common';
import styles from './styles.module.scss';

type Props = {
  sortBy: string;
  onChangeSortBy: (value: string) => void;
  filterType: string;
  onChangeFilterType: (value: string) => void;
  filterDate: string;
  onChangeFilterDate: (value: string) => void;
  filterDuration: string;
  onChangeFilterDuration: (value: string) => void;
};

const FilterSidebar: FC<Props> = ({
  sortBy: sBy,
  onChangeSortBy,
  filterType: fType,
  onChangeFilterType,
  filterDate: fDate,
  onChangeFilterDate,
  filterDuration: fDuration,
  onChangeFilterDuration,
}) => {
  return (
    <div className={styles['filter-sidebar']}>
      <div className={styles['filter-sidebar-title']}>
        <Icon name={IconName.FILTER} color="gray" />
        <span>filters</span>
      </div>
      <div className={styles['filter-sidebar-wrapper']}>
        <FilterDropdown title="date" options={FilterDate} filter={fDate} onChangeFilter={onChangeFilterDate} />
        <FilterDropdown title="type" options={FilterType} filter={fType} onChangeFilter={onChangeFilterType} />
        <FilterDropdown
          title="duration"
          options={FilterDuration}
          filter={fDuration}
          onChangeFilter={onChangeFilterDuration}
        />
        <FilterSelect title="Sort by" options={SortBy} filter={sBy} onChangeFilter={onChangeSortBy} />
      </div>
    </div>
  );
};

export { FilterSidebar };
