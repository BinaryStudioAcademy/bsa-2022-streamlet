import React from 'react';
import { FC } from 'common/types/types';
import { IconName, FilterDate, FilterType } from 'common/enums/enums';
import { useId } from 'hooks/hooks';
import { Icon } from 'components/common/common';

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
  const ftId = useId();
  const fdId = useId();

  const onHandleChangeFilterType = (e: React.FormEvent<HTMLSelectElement>): void =>
    onChangeFilterTypeId(e.currentTarget.value);
  const onHandleChangeFilterDate = (e: React.FormEvent<HTMLSelectElement>): void =>
    onChangeFilterDateId(e.currentTarget.value);

  return (
    <div className={styles['filter-bar']}>
      <div className={styles['filter-bar-type']}>
        <label htmlFor="filterBarType" className={styles['filter-bar-select']}>
          <select id="filterBarType" onChange={onHandleChangeFilterType} value={activeFilterTypeId}>
            <option value="">all</option>
            {FilterType.map((o) => (
              <option key={`${ftId}-${o.value}`} value={o.value}>
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
            <option value="">anytime</option>
            {FilterDate.map((o) => (
              <option key={`${fdId}-${o.value}`} value={o.value}>
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
