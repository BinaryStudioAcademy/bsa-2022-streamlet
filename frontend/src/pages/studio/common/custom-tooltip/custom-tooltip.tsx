import { getFormatDurationString } from 'helpers/helpers';
import { FC } from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import styles from './styles.module.scss';

const CustomTooltip: FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles['custom-tooltip']}>
        <p className={styles['label']}>Time: {getFormatDurationString(label)}</p>
        {payload.map((data) => (
          <p className={styles['data-entry']} key={data.name}>{`${data.name} : ${data.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};

export { CustomTooltip };
