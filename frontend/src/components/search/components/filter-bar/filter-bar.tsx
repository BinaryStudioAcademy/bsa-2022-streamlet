import React from 'react';
import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useId } from 'hooks/hooks';
import { Icon } from 'components/common/common';
import { allTypeFilters, allDateFilters } from 'components/search/config/config';

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
  const ftId = useId();
  const fdId = useId();

  const onHandleChangeFilterType = (e: React.FormEvent<HTMLSelectElement>): void =>
    onChangeFilterTypeId(e.currentTarget.value);
  const onHandleChangeFilterDate = (e: React.FormEvent<HTMLSelectElement>): void =>
    onChangeFilterDateId(e.currentTarget.value);

  return (
    <div className={styles['filter-bar']}>
      <input type="checkbox" className={styles['filter-bar-toggle']} id={toggleId} />
      <label className={styles['filter-bar-title']} htmlFor={toggleId}>
        <Icon name={IconName.FILTER} />
        <span>filters</span>
      </label>
      <div className={styles['filter-bar-wrapper']}>
        <div className={styles['filter-bar-type']}>
          <label htmlFor="filterBarType" className={styles['filter-bar-select']}>
            <select id="filterBarType" onChange={onHandleChangeFilterType} value={activeFilterTypeId}>
              {allTypeFilters.map((o) => (
                <option key={`${ftId}-${o.id}`} value={o.id}>
                  {o.text}
                </option>
              ))}
            </select>
            <Icon name={IconName.ARROW_DOWN} />
          </label>
        </div>
        <div className={styles['filter-bar-date']}>
          <label htmlFor="filterBarDate" className={styles['filter-bar-select']}>
            <select id="filterBarDate" onChange={onHandleChangeFilterDate} value={activeFilterDateId}>
              {allDateFilters.map((o) => (
                <option key={`${fdId}-${o.id}`} value={o.id}>
                  {o.text}
                </option>
              ))}
            </select>
            <Icon name={IconName.ARROW_DOWN} />
          </label>
        </div>
      </div>
    </div>
  );
};

export { FilterBar };
