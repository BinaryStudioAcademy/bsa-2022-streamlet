import dayjs from 'dayjs';
import { FC, LineChartData } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  data: LineChartData;
  tab: string;
};

export const StatisticsBlock: FC<Props> = ({ data }) => {
  const { data: dataPeriods, dataLength } = data;
  const amount = dataPeriods.reduce((p, c) => p + c.value1, 0);
  const average = Math.floor(amount / dataLength);
  const peakValue = Math.max(...dataPeriods.map((o) => o.value1));
  const peakData = dataPeriods.filter((o) => o.value1 === peakValue);

  if (dataLength === 0) {
    return (
      <div className={styles['blocks']}>
        <p>No data yet.</p>
      </div>
    );
  }

  return (
    <div className={styles['blocks']}>
      <div className={styles['block']}>
        <div className={styles['text']}>Average</div>
        <span className={styles['amount']}>{average.toLocaleString('ru-RU')}</span>
      </div>
      <div className={styles['block']}>
        <div className={styles['text']}>Maximum</div>
        <span className={styles['amount']}>{peakValue.toLocaleString('ru-RU')}</span>
      </div>
      <div className={styles['block']}>
        <div className={styles['text']}>Peack time</div>
        <span className={styles['amount']}>{dayjs(peakData[0].date).format('MMM DD')}</span>
      </div>
    </div>
  );
};
