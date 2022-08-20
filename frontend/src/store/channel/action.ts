import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig, ChannelBaseResponse } from 'common/types/types';
import { ActionType } from './common';

const getChannel = createAsyncThunk<ChannelBaseResponse, string, AsyncThunkConfig>(
  ActionType.GET_CHANNEL,
  async (channelId: string, { extra }) => {
    const { channelApi } = extra;

    return await channelApi.getById(channelId);
  },
);

export { getChannel };
