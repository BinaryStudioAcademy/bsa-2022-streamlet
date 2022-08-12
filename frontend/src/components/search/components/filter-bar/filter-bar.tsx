import React from 'react';
import { FC } from 'common/types/types';
import { IconName, FilterDate, FilterType } from 'common/enums/enums';
import { Icon } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  filterType: string;
  onChangeFilterType: (value: string) => void;
  filterDate: string;
  onChangeFilterDate: (value: string) => void;
};

const FilterBar: FC<Props> = ({ filterType: fType, onChangeFilterType, filterDate: fDate, onChangeFilterDate }) => {
  const onHandleChangeFilterType = (e: React.FormEvent<HTMLSelectElement>): void =>
    onChangeFilterType(e.currentTarget.value);
  const onHandleChangeFilterDate = (e: React.FormEvent<HTMLSelectElement>): void =>
    onChangeFilterDate(e.currentTarget.value);

  return (
    <div className={styles['filter-bar']}>
      <div className={styles['filter-bar-type']}>
        <label htmlFor="filterBarType" className={styles['filter-bar-select']}>
          <select id="filterBarType" onChange={onHandleChangeFilterType} value={fType}>
            <option value="">all</option>
            {FilterType.map((o) => (
              <option key={`opt-${o.value}`} value={o.value}>
                {o.text}
              </option>
            ))}
          </select>
          <Icon name={IconName.ARROW_DOWN} />
        </label>
      </div>
      <div className={styles['filter-bar-date']}>
        <label htmlFor="filterBarDate" className={styles['filter-bar-select']}>
          <select id="filterBarDate" onChange={onHandleChangeFilterDate} value={fDate}>
            <option value="">anytime</option>
            {FilterDate.map((o) => (
              <option key={`opt-${o.value}`} value={o.value}>
                {o.text}
              </option>
            ))}
          </select>
          <Icon name={IconName.ARROW_DOWN} />
        </label>
      </div>
    </div>
  );
};

export { FilterBar };
