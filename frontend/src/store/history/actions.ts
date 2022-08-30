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

export { addVideoHistoryRecord };
