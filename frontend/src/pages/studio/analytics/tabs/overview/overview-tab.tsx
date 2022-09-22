import { FC } from 'common/types/types';
import { DataStatus, LoaderSize, StatsPeriodValue } from 'common/enums/enums';
import { useAppDispatch, useAppSelector, useEffect, useCallback, useState } from 'hooks/hooks';
import { Loader } from 'components/common/common';
import { CustomPieChart, CustomAreaChart, CustomSimpleBar, Periods } from 'pages/studio/analytics';
import { statsActions } from 'store/actions';
import {
  defaultDeviceData,
  defaultLangData,
  LANG_DATA_LIMIT,
  matchOverviewChartTabWithTitle,
  matchOverviewChartTabWithValueFunc,
  OverviewChartTab,
} from './config';

import styles from './styles.module.scss';
import { getWatchTimeDataInHours } from '../watch-time/helpers';
import { addDefaultToActualLangData, getSumOfChartDataValue, secondsToHours } from './helpers';
import { getTextFormatedViewsString } from 'helpers/helpers';
import clsx from 'clsx';

const OverviewTab: FC = () => {
  const dispatch = useAppDispatch();
  const { user, period, dataStatus, channel, viewData, watchTimeData, subsData, deviceData, langData, overviewData } =
    useAppSelector((state) => ({
      user: state.auth.user,
      period: state.stats.statsConfig.period,
      dataStatus: state.stats.channelStats.chart.dataStatus,
      channel: state.stream.channel,
      viewData: state.stats.channelStats.chart.views,
      watchTimeData: state.stats.channelStats.chart.watchTime,
      subsData: state.stats.channelStats.chart.subs,
      deviceData: state.stats.channelStats.chart.device,
      langData: state.stats.channelStats.chart.language,
      overviewData: state.stats.channelStats.overview.data,
    }));

  const hasUser = Boolean(user);

  const [chartTab, setChartTab] = useState(OverviewChartTab.VIEWS);

  const handleChangeChartTab = (value: OverviewChartTab): void => {
    setChartTab(value);
  };

  const watchTimeDataInHours = getWatchTimeDataInHours(watchTimeData);

  const isDeviceData = deviceData.every((d) => d.value === 0);

  const matchOverviewChartTabWithValue: Record<OverviewChartTab, number | undefined> = {
    [OverviewChartTab.VIEWS]: getSumOfChartDataValue(viewData, 'value1'),
    [OverviewChartTab.WATCH_TIME]: getSumOfChartDataValue(watchTimeData, 'value1'),
    [OverviewChartTab.SUBSCRIBERS]:
      getSumOfChartDataValue(subsData, 'value1') - getSumOfChartDataValue(subsData, 'value2'),
  };

  const overviewChartTabs = [OverviewChartTab.VIEWS, OverviewChartTab.WATCH_TIME, OverviewChartTab.SUBSCRIBERS].map(
    (ct) => ({
      type: ct,
      title: matchOverviewChartTabWithTitle[ct],
      value: matchOverviewChartTabWithValue[ct],
      valueFunc: matchOverviewChartTabWithValueFunc[ct],
    }),
  );

  const matchOverviewChartTabWithComponent: Record<OverviewChartTab, JSX.Element> = {
    [OverviewChartTab.VIEWS]: <CustomAreaChart data={viewData} valueNames={{ value1: 'views' }} period={period} />,
    [OverviewChartTab.WATCH_TIME]: (
      <CustomAreaChart data={watchTimeDataInHours} valueNames={{ value1: 'time' }} period={period} />
    ),
    [OverviewChartTab.SUBSCRIBERS]: (
      <CustomSimpleBar data={subsData} valueNames={{ value1: 'subscribed', value2: 'unsubscribed' }} period={period} />
    ),
  };

  const handleChangePeriod = (value: StatsPeriodValue): void => {
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
      await dispatch(statsActions.getChannelOverviewData({ channelId: channel.id }));
    }
  }, [period, channel?.id, dispatch]);

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
        <div className={styles['blocks-header']}>
          <Periods onChange={handleChangePeriod} defaultValue={period} />
        </div>
        <div className={styles['blocks-body']}>
          <div className={styles['charts-block']}>
            <ul className={styles['charts-block-nav']}>
              {overviewChartTabs.map((oct) => (
                <li
                  key={oct.type}
                  className={clsx(styles['charts-block-item'], chartTab === oct.type && styles['active'])}
                  onClick={(): void => handleChangeChartTab(oct.type)}
                >
                  <span className={styles['charts-block-item-title']}>{oct.title}</span>
                  <span className={styles['charts-block-item-count']}>
                    {oct.value !== undefined ? oct.valueFunc(oct.value) : ''}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles['charts-block-chart']}>{matchOverviewChartTabWithComponent[chartTab]}</div>
          </div>
          <div className={styles['overview-block']}>
            <span className={styles['block-title']}>Channel analytics</span>
            <div className={styles['overview-block-body']}>
              <div className={styles['overview-block-part']}>
                <span className={styles['overview-block-part-title']}>Current subscribers</span>
                <span className={styles['overview-block-part-count']}>
                  {overviewData?.subscribers !== undefined ? overviewData.subscribers.toLocaleString() : ''}
                </span>
              </div>
              <div className={styles['overview-block-part']}>
                <span className={clsx(styles['overview-block-part-title'], styles['summary'])}>Summary</span>
                <div className={styles['overview-block-summary']}>
                  <span className={styles['overview-block-summary-title']}>Videos</span>
                  <span className={styles['overview-block-summary-count']}>
                    {overviewData?.videos !== undefined ? getTextFormatedViewsString(overviewData.videos) : ''}
                  </span>
                </div>
                <div className={styles['overview-block-summary']}>
                  <span className={styles['overview-block-summary-title']}>Views</span>
                  <span className={styles['overview-block-summary-count']}>
                    {overviewData?.views !== undefined ? getTextFormatedViewsString(overviewData.views) : ''}
                  </span>
                </div>
                <div className={styles['overview-block-summary']}>
                  <span className={styles['overview-block-summary-title']}>Watch time (hours)</span>
                  <span className={styles['overview-block-summary-count']}>
                    {overviewData?.watchTime !== undefined
                      ? getTextFormatedViewsString(Math.round(secondsToHours(overviewData.watchTime)))
                      : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['langs-block']}>
            <span className={styles['block-title']}>User Languages</span>
            <div className={styles['langs-block-table']}>
              <div className={clsx(styles['langs-block-table-item'], styles['table-header'])}>
                <span className={styles['langs-block-table-item-lang']}>lang</span>
                <span className={styles['langs-block-table-item-count']}>count</span>
              </div>
              {(langData.data.length === 0 ? defaultLangData : addDefaultToActualLangData(langData.data))
                .slice(0, LANG_DATA_LIMIT)
                .map((lg) => (
                  <div key={lg.language} className={styles['langs-block-table-item']}>
                    <span className={styles['langs-block-table-item-lang']}>{lg.language}</span>
                    <span className={styles['langs-block-table-item-count']}>
                      {getTextFormatedViewsString(lg.languageCount)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles['device-block']}>
            <span className={styles['block-title']}>User Devices</span>
            <CustomPieChart data={isDeviceData ? defaultDeviceData : deviceData} hidePercents={isDeviceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { OverviewTab };
