import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, BatchPayload } from 'common/types/types';
import { ActionType } from './common';
import { HistoryResponseDto } from '../../common/types/history/history';

const getUserVideoHistoryRecord = createAsyncThunk<HistoryResponseDto, number, AsyncThunkConfig>(
  ActionType.GET_USER_HISTORY,
  async (page, { extra }) => {
    const { historyApi } = extra;

    return historyApi.getUserHVideoHistoryRecord(page);
  },
);

const deleteAllUserHistory = createAsyncThunk<BatchPayload, void, AsyncThunkConfig>(
  ActionType.DELETE_ALL_USER_HISTORY,
  async (_, { extra }) => {
    const { historyApi } = extra;

    return historyApi.deleteAllUserHistory();
  },
);

export { getUserVideoHistoryRecord, deleteAllUserHistory };
