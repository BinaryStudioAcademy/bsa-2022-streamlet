import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  ChannelInfoRequestDto,
  ChannelInfoResponseDto,
  CreateSubscriptionResponseDto,
} from 'common/types/types';
import { ActionsTypes } from './common';

const loadChannel = createAsyncThunk<ChannelInfoResponseDto, ChannelInfoRequestDto, AsyncThunkConfig>(
  ActionsTypes.LOAD_CHANNEL,
  async ({ id }, { extra: { channelCrudApi } }) => {
    return channelCrudApi.getChannelInfo({ id });
  },
);

const channelSubscribeToggle = createAsyncThunk<CreateSubscriptionResponseDto, string, AsyncThunkConfig>(
  ActionsTypes.SUBSCRIBE_TOGGLE,
  async (channelId: string, { extra }) => {
    const { channelSubscriptionApi } = extra;

    return await channelSubscriptionApi.createSubscription(channelId);
  },
);

export { loadChannel, channelSubscribeToggle };
