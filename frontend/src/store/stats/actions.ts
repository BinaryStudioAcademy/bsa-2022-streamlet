import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfigHttpError } from 'common/types/app/app';
import { AsyncThunkConfig } from 'common/types/types';
import { CreateChannelStatRequestDto, CreateManyVideoStatsRequestDto, CreateVideoStatDto } from 'shared/build';

import { ActionType } from './common';

const sendChannelStat = createAsyncThunk<boolean, { id: string } & CreateChannelStatRequestDto, AsyncThunkConfig>(
  ActionType.SEND_CHANNEL_STAT,
  async (channelStat, { extra: { statsApi } }) => {
    return statsApi.sendChannelStatEvent(channelStat);
  },
);

const addVideoStat = createAction<{
  statId: number;
  data: Omit<CreateVideoStatDto, 'userId' | 'createdAt'>;
}>(ActionType.ADD_VIDEO_STAT);

const updateVideoStat = createAction<{
  statId: number;
  data: Pick<CreateVideoStatDto, 'videoId'> &
    Partial<
      Omit<CreateVideoStatDto, 'userId' | 'videoId' | 'source' | 'wasSubscribed' | 'device' | 'language' | 'createdAt'>
    >;
}>(ActionType.UPDATE_VIDEO_STAT);

const sendVideoStats = createAsyncThunk<
  Record<string, boolean>,
  Record<string, { stats: { statId: number; data: Omit<CreateVideoStatDto, 'userId'> }[] }>,
  AsyncThunkConfigHttpError
>(ActionType.SEND_VIDEO_STAT, async (videoStats, { extra: { statsApi } }) => {
  const dataKeys = Object.keys(videoStats);
  const videoStatsData = dataKeys.reduce((data, id) => {
    data[id] = { stats: videoStats[id].stats.map((s) => s.data) };
    return data;
  }, {} as CreateManyVideoStatsRequestDto);
  return statsApi.sendManyVideoStatsEvent(videoStatsData);
});

export { sendChannelStat, addVideoStat, updateVideoStat, sendVideoStats };
