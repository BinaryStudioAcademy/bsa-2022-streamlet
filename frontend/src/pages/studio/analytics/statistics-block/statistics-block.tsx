import { FC } from 'common/types/types';
import dayjs from 'dayjs';
import { ChartData } from '../line-chart/types/types';

import styles from './styles.module.scss';

type Props = {
  data: ChartData;
  tab: string;
};

export const StatisticsBlock: FC<Props> = ({ data, tab }) => {
  const { data: dataPeriods, dataLength } = data;
  const amount = dataPeriods.reduce((p, c) => p + c.value, 0);
  const everage = Math.floor(amount / dataLength);
  const peakValue = Math.max(...dataPeriods.map((o) => o.value));
  const peakData = dataPeriods.filter((o) => o.value === peakValue);
  const minutes = dataPeriods.reduce((p, c) => p + (c.minutes ?? 0), 0);

  return (
    <div className={styles['blocks']}>
      <div className={styles['block']}>
        <div className={styles['text']}>Everage</div>
        <span className={styles['amount']}>{everage.toLocaleString('ru-RU')}</span>
      </div>
      <div className={styles['block']}>
        <div className={styles['text']}>Maximum</div>
        <span className={styles['amount']}>{amount.toLocaleString('ru-RU')}</span>
      </div>
      {tab === 'Views' ? (
        <div className={styles['block']}>
          <div className={styles['text']}>Watched minutes</div>
          <span className={styles['amount']}>{minutes.toLocaleString('ru-RU')}</span>
        </div>
      ) : (
        ''
      )}
      <div className={styles['block']}>
        <div className={styles['text']}>Peack time</div>
        <span className={styles['amount']}>{dayjs(peakData[0].date).format('MMM DD')}</span>
      </div>
      <div className={styles['block']}>
        <div className={styles['text']}>{tab}</div>
        <span className={styles['amount']}>{amount.toLocaleString('ru-RU')}</span>
      </div>
    </div>
  );
};
