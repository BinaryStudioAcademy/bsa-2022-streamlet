import { FC } from 'common/types/types';
import { useState } from 'hooks/hooks';
import { ChangeEvent } from 'react';

import styles from './styles.module.scss';

type Props = {
  onChange: (value: string) => void;
};

export const Periods: FC<Props> = ({ onChange }) => {
  const options = [
    { label: 'Last 7 days', value: '7' },
    { label: 'Last 30 days', value: '30' },
    { label: 'Last 90 days', value: '90' },
    { label: 'Last 365 days', value: '365' },
  ];

  const [value, setValue] = useState('Last 7 days');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={styles['blocks']}>
      <select className={styles['block']} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};
