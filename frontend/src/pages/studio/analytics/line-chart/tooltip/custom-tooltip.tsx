import { FC, LineChartDataPeriod } from 'common/types/types';
import { useId } from 'hooks/hooks';
import { getDateStringAtDdMmYyyyFormat } from 'helpers/date/get-date-string-at-dd-mm-yyyy-format/get-date-string-at-dd-mm-yyyy-format';

import styles from './styles.module.scss';

type TooltipProps = {
  active: boolean;
  payload: {
    payload: LineChartDataPeriod;
  }[];
  valueNames?: Partial<Record<keyof Omit<LineChartDataPeriod, 'date'>, string>>;
};

export const CustomTooltip: FC<TooltipProps> = ({ active, payload, valueNames }) => {
  const tooltipId = useId();
  if (active) {
    const { date, ...values } = payload && payload.length ? payload[0].payload : { date: null };
    const valueKeys = Object.keys(values) as (keyof typeof values)[];
    return (
      <div className={styles['area-chart-tooltip']}>
        <p>{date ? getDateStringAtDdMmYyyyFormat(new Date(date)) : ' -- '}</p>
        {valueKeys.map((k) => (
          <p key={`${tooltipId}${k}`}>
            {valueNames ? `${valueNames[k] ? valueNames[k] : k} : ` : `${k} `}
            <em>{values[k] !== undefined ? values[k] : ' -- '}</em>
          </p>
        ))}
      </div>
    );
  }

  return null;
};
