import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '../../common/types/app/async-thunk-config.type';
import { ActionType } from '../notification/common';
import { HistoryResponseDto } from 'common/types/types';

const getUserHistory = createAsyncThunk<HistoryResponseDto[], null, AsyncThunkConfig>(
  ActionType.GET_ALL,
  async (arg, { extra }) => {
    const { historyApi } = extra;

    return await historyApi.getUserHistory();
  },
);

export { getUserHistory };
