import React from 'react';
import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useId } from 'hooks/hooks';
import { Icon } from 'components/common/common';
import { allTypeFilters, allDateFilters } from 'components/search/config/config';
import { FilterBarSelect } from '../common/common';

import styles from './styles.module.scss';

type Props = {
  activeFilterTypeId: string;
  onChangeFilterTypeId: (value: string) => void;
  activeFilterDateId: string;
  onChangeFilterDateId: (value: string) => void;
};

const FilterBar: FC<Props> = ({
  activeFilterTypeId,
  onChangeFilterTypeId,
  activeFilterDateId,
  onChangeFilterDateId,
}) => {
  const toggleId = useId();

  return (
    <div className={styles['filter-bar']}>
      <input type="checkbox" className={styles['filter-bar-toggle']} id={toggleId} />
      <label className={styles['filter-bar-title']} htmlFor={toggleId}>
        <Icon name={IconName.FILTER} />
        <span>filters</span>
      </label>
      <div className={styles['filter-bar-wrapper']}>
        <FilterBarSelect
          activeFilterId={activeFilterTypeId}
          onChangeFilterId={onChangeFilterTypeId}
          options={allTypeFilters}
        />
        <FilterBarSelect
          activeFilterId={activeFilterDateId}
          onChangeFilterId={onChangeFilterDateId}
          options={allDateFilters}
        />
      </div>
    </div>
  );
};

export { FilterBar };
