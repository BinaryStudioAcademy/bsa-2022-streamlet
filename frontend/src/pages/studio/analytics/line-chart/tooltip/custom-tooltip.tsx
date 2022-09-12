import { FC } from 'common/types/types';
import { getDateStringAtDdMmYyyyFormat } from 'helpers/date/get-date-string-at-dd-mm-yyyy-format/get-date-string-at-dd-mm-yyyy-format';

import styles from './styles.module.scss';

type TooltipProps = {
  active: boolean;
  payload: {
    payload: {
      date: Date;
      value: number;
    };
  }[];
};

export const CustomTooltip: FC<TooltipProps> = ({ active, payload }: TooltipProps) => {
  if (active) {
    const { date, value } =
      payload && payload.length
        ? payload[0].payload
        : {
            date: null,
            value: null,
          };
    return (
      <div className={styles['area-chart-tooltip']}>
        <p>{date ? getDateStringAtDdMmYyyyFormat(new Date(date)) : ' -- '}</p>
        <p>
          {'value : '}
          <em>{value ? value : ' -- '}</em>
        </p>
      </div>
    );
  }

  return null;
};
