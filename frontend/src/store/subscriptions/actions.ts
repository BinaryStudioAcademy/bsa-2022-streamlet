import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, CreateSubscriptionResponseDto } from 'common/types/types';
import { ActionType } from './common';

const channelSubscribe = createAsyncThunk<CreateSubscriptionResponseDto, string, AsyncThunkConfig>(
  ActionType.SUBSCRIBE_TOGGLE,
  async (channelId: string, { extra }) => {
    const { channelSubscriptionApi } = extra;

    return await channelSubscriptionApi.createSubscription(channelId);
  },
);

export { channelSubscribe };
