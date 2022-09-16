import { ViewsChart } from 'pages/studio/common/live-stream-analytics/viewers-chart/viewers-chart';
import React, { FC } from 'react';
import { Header } from './header/header';
import styles from './styles.module.scss';

const LiveAnalytics: FC = () => {
  return (
    <div className={styles['analytics-container']}>
      <Header />
      <ViewsChart
        viewsData={[
          {
            secondsFromStart: 0,
            subs: 0,
            unsubs: 0,
          },
          {
            secondsFromStart: 30,
            subs: 20,
            unsubs: 2,
          },
          {
            secondsFromStart: 60,
            subs: 10,
            unsubs: 20,
          },
          {
            secondsFromStart: 90,
            subs: 80,
            unsubs: 60,
          },
          {
            secondsFromStart: 120,
            subs: 79,
            unsubs: 100,
          },
          {
            secondsFromStart: 150,
            subs: 9,
            unsubs: 20,
          },
        ]}
      />
    </div>
  );
};

export { LiveAnalytics };
