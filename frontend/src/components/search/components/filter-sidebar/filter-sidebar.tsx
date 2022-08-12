import { FC } from 'common/types/types';
import { IconName } from 'common/enums/components';
import { Icon } from 'components/common/icon';
import { FilterDropdown, FilterSelect } from '../common/common';
import { filterDate, filterType, filterDuration, sortBy } from '../../common/constants';
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
    <>
      <div className={styles['filter-sidebar']}>
        <div className={styles['filter-sidebar-title']}>
          <Icon name={IconName.FILTER} color="gray" />
          <span>filters</span>
        </div>
        <div className={styles['filter-sidebar-wrapper']}>
          <FilterDropdown title="date" options={filterDate} filter={fDate} onChangeFilter={onChangeFilterDate} />
          <FilterDropdown title="type" options={filterType} filter={fType} onChangeFilter={onChangeFilterType} />
          <FilterDropdown
            title="duration"
            options={filterDuration}
            filter={fDuration}
            onChangeFilter={onChangeFilterDuration}
          />
          <FilterSelect title="Sort by" options={sortBy} filter={sBy} onChangeFilter={onChangeSortBy} />
        </div>
      </div>
    </>
  );
};

export { FilterSidebar };
