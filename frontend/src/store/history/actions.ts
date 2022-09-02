import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';
import { HistoryResponseDto } from '../../common/types/history/history';

const getUserVideoHistoryRecord = createAsyncThunk<HistoryResponseDto, number, AsyncThunkConfig>(
  ActionType.GET_USER_HISTORY,
  async (page, { extra }) => {
    const { historyApi } = extra;

    return historyApi.getUserHVideoHistoryRecord(page);
  },
);

export { getUserVideoHistoryRecord };
