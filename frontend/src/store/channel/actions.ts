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

const loadMyChannel = createAsyncThunk<OwnChannelResponseDto, void, AsyncThunkConfigHttpError>(
  ActionsTypes.LOAD_MY_CHANNEL,
  async (_payload, { extra: { channelCrudApi }, rejectWithValue }) => {
    try {
      return channelCrudApi.getMyChannelInfo();
    } catch (error) {
      if (error instanceof HttpError) {
        return rejectWithValue(serializeHttpError(error));
      }
      throw error;
    }
  },
);

const getStreamingKey = createAsyncThunk<StreamingKeyResponseDto, DefaultRequestParam, AsyncThunkConfigHttpError>(
  ActionsTypes.LOAD_MY_CHANNEL,
  async (id, { extra: { channelStreamingApi }, rejectWithValue }) => {
    try {
      return channelStreamingApi.getStreamingKey(id);
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
>(ActionsTypes.LOAD_MY_CHANNEL, async (payload, { extra: { channelStreamingApi }, rejectWithValue }) => {
  try {
    return channelStreamingApi.resetStreamingKey(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return rejectWithValue(serializeHttpError(error));
    }
    throw error;
  }
});

export { loadChannel, loadMyChannel, getStreamingKey, resetStreamingKey };
