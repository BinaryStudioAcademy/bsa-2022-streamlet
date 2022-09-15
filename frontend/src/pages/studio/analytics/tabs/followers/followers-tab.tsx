import { FC } from 'react';
import cn from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'hooks/hooks';
import { CustomLineChart, Periods, StatisticsBlock } from 'pages/studio/analytics';
import { ChartData } from 'frontend/src/pages/studio/analytics/line-chart/types/types';
import {
  getPeriods,
  getFormat,
  getLength,
  getNewPeriods,
} from 'frontend/src/pages/studio/analytics/line-chart/mock-helper/mock-helper';

import styles from './styles.module.scss';

const FollowersTab: FC = () => {
  const [days, setDays] = useState(0);
  const [data, setData] = useState<ChartData>({
    data: getNewPeriods('7', dayjs().month() + 1),
    format: 'day',
    dataLength: 7,
  });

  const handleChange = (value: string): void => {
    setData({
      data: getPeriods(value),
      format: getFormat(Number(value)),
      dataLength: getLength(Number(value)),
    });
    setDays(Number(value));
  };

  return (
    <div className={styles['blocks']}>
      <div className={cn(styles['element'], styles['chart'])}>
        <Periods onChange={handleChange} />
        <CustomLineChart data={data} days={days} />
      </div>
      <div className={cn(styles['element'], styles['statistics'])}>
        <StatisticsBlock data={data} tab="Followers" />
      </div>
    </div>
  );
};

export { FollowersTab };
