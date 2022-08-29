import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfigHttpError } from 'common/types/app/async-thunk-config.type';
import {
  AsyncThunkConfig,
  ChannelInfoRequestDto,
  ChannelInfoResponseDto,
  DefaultRequestParam,
  OwnChannelResponseDto,
  ResetStreamingKeyRequestDto,
  StreamingKeyResponseDto,
  CreateSubscriptionResponseDto,
} from 'common/types/types';
import { serializeHttpError } from 'helpers/http/http';
import { HttpError } from 'shared/build';
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

const loadMyChannel = createAsyncThunk<OwnChannelResponseDto, void, AsyncThunkConfigHttpError>(
  ActionsTypes.LOAD_MY_CHANNEL,
  async (_payload, { extra: { channelCrudApi }, rejectWithValue }) => {
    try {
      return await channelCrudApi.getMyChannelInfo();
    } catch (error) {
      if (error instanceof HttpError) {
        return rejectWithValue(serializeHttpError(error));
      }
      console.warn(error);
      throw error;
    }
  },
);

const getStreamingKey = createAsyncThunk<StreamingKeyResponseDto, DefaultRequestParam, AsyncThunkConfigHttpError>(
  ActionsTypes.GET_STREAMING_KEY,
  async (id, { extra: { channelStreamingApi }, rejectWithValue }) => {
    try {
      return await channelStreamingApi.getStreamingKey(id);
    } catch (error) {
      if (error instanceof HttpError) {
        return rejectWithValue(serializeHttpError(error));
      }
      throw error;
    }
  },
);

const resetStreamingKey = createAsyncThunk<
  StreamingKeyResponseDto,
  ResetStreamingKeyRequestDto,
  AsyncThunkConfigHttpError
>(ActionsTypes.RESET_STREAMING_KEY, async (payload, { extra: { channelStreamingApi }, rejectWithValue }) => {
  try {
    return await channelStreamingApi.resetStreamingKey(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return rejectWithValue(serializeHttpError(error));
    }
    throw error;
  }
});

export { loadChannel, loadMyChannel, getStreamingKey, resetStreamingKey, channelSubscribeToggle };
