import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';
import { HistoryRequestDto, HistoryResponseDto } from '../../common/types/history/history';

const addVideoHistoryRecord = createAsyncThunk<HistoryResponseDto, HistoryRequestDto, AsyncThunkConfig>(
  ActionType.ADD_VIDEO_HISTORY_RECORD,
  async (payload, { extra }) => {
    const { historyApi } = extra;

    return historyApi.addHVideoHistoryRecord(payload);
  },
);

const getUserVideoHistoryRecord = createAsyncThunk<HistoryResponseDto, number, AsyncThunkConfig>(
  ActionType.GET_USER_HISTORY,
  async (page, { extra }) => {
    const { historyApi } = extra;

    return historyApi.getUserHVideoHistoryRecord(page);
  },
);

export { addVideoHistoryRecord, getUserVideoHistoryRecord };
