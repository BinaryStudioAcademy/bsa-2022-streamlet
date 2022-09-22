import cn from 'clsx';
import { FC } from 'common/types/types';
import { DataStatus, LoaderSize, StatsPeriodValue } from 'common/enums/enums';
import { useAppDispatch, useAppSelector, useEffect, useCallback } from 'hooks/hooks';
import { Loader } from 'components/common/common';
import { CustomAreaChart, Periods, StatisticsBlock } from 'pages/studio/analytics';
import { statsActions } from 'store/actions';

import styles from '../tab-with-chart-styles.module.scss';

const ViewsTab: FC = () => {
  const dispatch = useAppDispatch();
  const { user, period, data, dataStatus, channel } = useAppSelector((state) => ({
    user: state.auth.user,
    period: state.stats.statsConfig.period,
    data: state.stats.channelStats.chart.views,
    dataStatus: state.stats.channelStats.chart.dataStatus,
    channel: state.stream.channel,
  }));

  const hasUser = Boolean(user);

  const handleChange = (value: StatsPeriodValue): void => {
    dispatch(statsActions.setStatsConfigPeriod(value));
  };

  const handleGetChannelStatsViewsChart = useCallback(async () => {
    if (channel?.id) {
      await dispatch(
        statsActions.getChannelStatsChartData({
          channelId: channel.id,
          period,
        }),
      );
    }
  }, [period, channel?.id, dispatch]);

  const valueNames = {
    value1: 'views',
  };

  useEffect(() => {
    if (hasUser) {
      handleGetChannelStatsViewsChart();
    }
  }, [hasUser, handleGetChannelStatsViewsChart]);

  if (dataStatus === DataStatus.PENDING) {
    return <Loader spinnerSize={LoaderSize.SM} vCentered={true} hCentered={true} />;
  }

  return (
    <div className={styles['blocks']}>
      <div className={styles['blocks-wrapper']}>
        <div className={cn(styles['element'], styles['chart'])}>
          <Periods onChange={handleChange} defaultValue={period} />
          <CustomAreaChart data={data} valueNames={valueNames} period={period} />
        </div>
        <div className={cn(styles['element'], styles['statistics'])}>
          <StatisticsBlock data={data} tab="Views" />
        </div>
      </div>
    </div>
  );
};

export { ViewsTab };
