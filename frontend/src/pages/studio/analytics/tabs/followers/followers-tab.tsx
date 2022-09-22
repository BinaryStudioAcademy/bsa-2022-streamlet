import cn from 'clsx';
import { FC } from 'common/types/types';
import { DataStatus, LoaderSize, StatsPeriodValue } from 'common/enums/enums';
import { useAppDispatch, useAppSelector, useEffect, useCallback } from 'hooks/hooks';
import { Loader } from 'components/common/common';
import { CustomSimpleBar, Periods, StatisticsBlock } from 'pages/studio/analytics';
import { statsActions } from 'store/actions';

import styles from '../tab-with-chart-styles.module.scss';

const FollowersTab: FC = () => {
  const dispatch = useAppDispatch();
  const { user, period, data, dataStatus, channel } = useAppSelector((state) => ({
    user: state.auth.user,
    period: state.stats.statsConfig.period,
    data: state.stats.channelStats.chart.subs,
    dataStatus: state.stats.channelStats.chart.dataStatus,
    channel: state.stream.channel,
  }));

  const hasUser = Boolean(user);

  const handleChange = (value: StatsPeriodValue): void => {
    dispatch(statsActions.setStatsConfigPeriod(value));
  };

  const handleGetChannelStatsSubsChart = useCallback(async () => {
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
    value1: 'subscribed',
    value2: 'unsubscribed',
  };

  useEffect(() => {
    if (hasUser) {
      handleGetChannelStatsSubsChart();
    }
  }, [hasUser, handleGetChannelStatsSubsChart]);

  if (dataStatus === DataStatus.PENDING) {
    return <Loader spinnerSize={LoaderSize.SM} vCentered={true} hCentered={true} />;
  }

  return (
    <div className={styles['blocks']}>
      <div className={styles['blocks-wrapper']}>
        <div className={cn(styles['element'], styles['chart'])}>
          <Periods onChange={handleChange} defaultValue={period} />
          <CustomSimpleBar data={data} valueNames={valueNames} period={period} />
        </div>
        <div className={cn(styles['element'], styles['statistics'])}>
          <StatisticsBlock data={data} tab="Followers" />
        </div>
      </div>
    </div>
  );
};

export { FollowersTab };
