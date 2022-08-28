import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  ChannelInfoRequestDto,
  ChannelInfoResponseDto,
  DefaultRequestParam,
  OwnChannelResponseDto,
  ResetStreamingKeyRequestDto,
  StreamingKeyResponseDto,
} from 'common/types/types';
import { ActionsTypes } from './common';

const loadChannel = createAsyncThunk<ChannelInfoResponseDto, ChannelInfoRequestDto, AsyncThunkConfig>(
  ActionsTypes.LOAD_CHANNEL,
  async ({ id }, { extra: { channelCrudApi } }) => {
    return channelCrudApi.getChannelInfo({ id });
  },
);

const loadMyChannel = createAsyncThunk<OwnChannelResponseDto, void, AsyncThunkConfig>(
  ActionsTypes.LOAD_MY_CHANNEL,
  async (_payload, { extra: { channelCrudApi } }) => {
    return channelCrudApi.getMyChannelInfo();
  },
);

const getStreamingKey = createAsyncThunk<StreamingKeyResponseDto, DefaultRequestParam, AsyncThunkConfig>(
  ActionsTypes.LOAD_MY_CHANNEL,
  async (id, { extra: { channelStreamingApi } }) => {
    return channelStreamingApi.getStreamingKey(id);
  },
);

const resetStreamingKey = createAsyncThunk<StreamingKeyResponseDto, ResetStreamingKeyRequestDto, AsyncThunkConfig>(
  ActionsTypes.LOAD_MY_CHANNEL,
  async (payload, { extra: { channelStreamingApi } }) => {
    return channelStreamingApi.resetStreamingKey(payload);
  },
);

export { loadChannel, loadMyChannel, getStreamingKey, resetStreamingKey };
