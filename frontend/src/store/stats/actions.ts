import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { StatsPeriodValue } from 'common/enums/enums';
import { AsyncThunkConfigHttpError } from 'common/types/app/app';
import { AsyncThunkConfig } from 'common/types/types';
import dayjs from 'dayjs';
import {
  CreateChannelStatRequestDto,
  CreateManyVideoStatsRequestDto,
  CreateVideoStatDto,
  ChannelStatsChartDataResponseDto,
  ChannelStatsOverviewResponseDto,
} from 'shared/build';

import { ActionType } from './common';

const sendChannelStat = createAsyncThunk<boolean, { id: string } & CreateChannelStatRequestDto, AsyncThunkConfig>(
  ActionType.SEND_CHANNEL_STAT,
  async (channelStat, { extra: { statsApi } }) => {
    return statsApi.sendChannelStatEvent(channelStat);
  },
);

const addVideoStat = createAction<{
  statId: number;
  data: Omit<CreateVideoStatDto, 'userId' | 'createdAt' | 'view'>;
}>(ActionType.ADD_VIDEO_STAT);

const updateVideoStat = createAction<{
  statId: number;
  data: Pick<CreateVideoStatDto, 'videoId'> &
    Partial<
      Omit<
        CreateVideoStatDto,
        'userId' | 'videoId' | 'source' | 'wasSubscribed' | 'device' | 'language' | 'createdAt' | 'view'
      >
    >;
}>(ActionType.UPDATE_VIDEO_STAT);

const updatePlayerTime = createAction<number>(ActionType.UPDATE_PLAYER_TIME);

const sendVideoStats = createAsyncThunk<
  Record<string, boolean>,
  Record<string, { stats: { statId: number; data: Omit<CreateVideoStatDto, 'userId' | 'view'> }[] }>,
  AsyncThunkConfigHttpError
>(ActionType.SEND_VIDEO_STAT, async (videoStats, { extra: { statsApi } }) => {
  const dataKeys = Object.keys(videoStats);
  const videoStatsData = dataKeys.reduce((data, id) => {
    data[id] = { stats: videoStats[id].stats.map((s) => s.data) };
    return data;
  }, {} as CreateManyVideoStatsRequestDto);
  return statsApi.sendManyVideoStatsEvent(videoStatsData);
});

const setStatsConfigPeriod = createAction<StatsPeriodValue>(ActionType.SET_STATS_CONFIG_PERIOD);

const clearChannelStatsCharts = createAction<void>(ActionType.CLEAR_CHANNEL_STATS_CHARTS);

const clearChannelOverviewData = createAction<void>(ActionType.CLEAR_CHANNEL_OVERVIEW);

const getChannelStatsChartData = createAsyncThunk<
  ChannelStatsChartDataResponseDto,
  { channelId: string; period: StatsPeriodValue },
  AsyncThunkConfig
>(ActionType.GET_CHANNEL_STATS_DATA, async (request, { extra: { statsApi } }) => {
  const dateBeforePeriod = new Date();
  dateBeforePeriod.setDate(dateBeforePeriod.getDate() - Number(request.period));
  const dateFrom = dayjs(dateBeforePeriod).format('YYYY-MM-DD');

  return statsApi.getChannelStatsChartData({
    channelId: request.channelId,
    dateFrom,
  });
});

const getChannelOverviewData = createAsyncThunk<
  ChannelStatsOverviewResponseDto,
  { channelId: string },
  AsyncThunkConfig
>(ActionType.GET_CHANNEL_OVERVIEW, async (request, { extra: { statsApi } }) => {
  return statsApi.getChannelOverviewData(request);
});

export {
  sendChannelStat,
  addVideoStat,
  updateVideoStat,
  sendVideoStats,
  setStatsConfigPeriod,
  clearChannelStatsCharts,
  getChannelStatsChartData,
  updatePlayerTime,
  getChannelOverviewData,
  clearChannelOverviewData,
};
