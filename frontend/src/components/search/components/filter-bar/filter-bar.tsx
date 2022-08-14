import React from 'react';
import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useId, useAppDispatch, useAppSelector, useCallback } from 'hooks/hooks';
import { Icon } from 'components/common/common';
import { allTypeFilters, allDateFilters } from 'components/search/config/config';
import { FilterBarSelect } from '../common/common';
import { searchActions } from 'store/actions';

import styles from './styles.module.scss';

const FilterBar: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: {
      activeFilterId: { type: activeFilterTypeId, date: activeFilterDateId },
    },
  } = useAppSelector((state) => ({
    search: state.search,
  }));

  const toggleId = useId();

  const onChangeFilterTypeId = useCallback((v: string) => dispatch(searchActions.setActiveTypeFilterId(v)), [dispatch]);
  const onChangeFilterDateId = useCallback((v: string) => dispatch(searchActions.setActiveDateFilterId(v)), [dispatch]);

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
