import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, ChannelInfoRequestDto, ChannelInfoResponseDto } from 'common/types/types';
import { ActionsTypes } from './common';

const loadChannel = createAsyncThunk<ChannelInfoResponseDto, ChannelInfoRequestDto, AsyncThunkConfig>(
  ActionsTypes.LOAD_CHANNEL,
  async ({ id }, { extra: { channelCrudApi } }): Promise<ChannelInfoResponseDto> => {
    return channelCrudApi.getChannelInfo({ id });
  },
);

const loadMyChannel = createAsyncThunk<ChannelInfoResponseDto, null, AsyncThunkConfig>(
  ActionsTypes.LOAD_MY_CHANNEL,
  async (_payload, { extra: { channelCrudApi } }): Promise<ChannelInfoResponseDto> => {
    return channelCrudApi.getMyChannelInfo();
  },
);

export { loadChannel, loadMyChannel };
