import { StatsPeriodValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { useState } from 'hooks/hooks';
import { ChangeEvent } from 'react';
import { periodsOrder } from './config';
import { matchStatsPeriodWithLabel, matchStatsPeriodWithValue } from './helpers';

import styles from './styles.module.scss';

type Props = {
  onChange: (value: StatsPeriodValue) => void;
  defaultValue: StatsPeriodValue;
};

export const Periods: FC<Props> = ({ onChange, defaultValue }) => {
  const options = periodsOrder.map((p) => ({
    type: p,
    label: matchStatsPeriodWithLabel[p],
    value: matchStatsPeriodWithValue[p],
  }));

  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValue(e.target.value as StatsPeriodValue);
    onChange(e.target.value as StatsPeriodValue);
  };

  return (
    <div className={styles['blocks']}>
      <select className={styles['block']} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.type} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
