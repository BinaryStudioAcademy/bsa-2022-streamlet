import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, ChannelInfoRequestDto, ChannelInfoResponseDto } from 'common/types/types';
import { ChannelProfileUpdateDto, ChannelProfileUpdateResponseDto } from 'shared/build';
import { ActionsTypes } from './common';

const loadChannel = createAsyncThunk<ChannelInfoResponseDto, ChannelInfoRequestDto, AsyncThunkConfig>(
  ActionsTypes.LOAD_CHANNEL,
  async ({ id }, { extra: { channelCrudApi } }): Promise<ChannelInfoResponseDto> => {
    return channelCrudApi.getChannelInfo({ id });
  },
);

const loadMyChannelInfo = createAsyncThunk<ChannelProfileUpdateResponseDto, void, AsyncThunkConfig>(
  ActionsTypes.LOAD_CHANNEL_SETTINGS,
  async (_, { extra: { channelCrudApi } }): Promise<ChannelProfileUpdateResponseDto> => {
    const channelInfo = await channelCrudApi.getMyChannel();
    return channelInfo;
  },
);

const updateChannelInfo = createAsyncThunk<ChannelProfileUpdateResponseDto, ChannelProfileUpdateDto, AsyncThunkConfig>(
  ActionsTypes.UPDATE_CHANNEL_INFO,
  async ({ id, name, description }, { extra: { channelCrudApi } }): Promise<ChannelProfileUpdateResponseDto> => {
    const channelInfo = await channelCrudApi.updateChannelInfo({
      id,
      name,
      description,
    });
    return channelInfo;
  },
);

const unloadChannelInfo = createAction(ActionsTypes.UNLOAD_CHANNEL_SETTINGS);

export { loadChannel, loadMyChannelInfo, unloadChannelInfo, updateChannelInfo };
