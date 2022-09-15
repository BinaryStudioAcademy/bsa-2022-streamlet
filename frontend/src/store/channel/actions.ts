import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, ChannelInfoRequestDto, ChannelInfoResponseDto } from 'common/types/types';
import {
  ChannelProfileUpdateDto,
  ChannelProfileUpdateMediaRequestDto,
  ChannelProfileUpdateResponseDto,
  DefaultRequestParam,
} from 'shared/build';
import { ActionsTypes } from './common';

const loadChannel = createAsyncThunk<ChannelInfoResponseDto, ChannelInfoRequestDto, AsyncThunkConfig>(
  ActionsTypes.LOAD_CHANNEL,
  async ({ id }, { extra: { channelCrudApi } }) => {
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

const updateChannelAvatar = createAsyncThunk<
  ChannelProfileUpdateResponseDto,
  ChannelProfileUpdateMediaRequestDto & DefaultRequestParam,
  AsyncThunkConfig
>(
  ActionsTypes.UPDATE_CHANNEL_AVATAR,
  async ({ id, base64Str }, { extra: { channelCrudApi } }): Promise<ChannelProfileUpdateResponseDto> => {
    const channelInfo = await channelCrudApi.updateChannelAvatar({
      id,
      base64Str,
    });
    return channelInfo;
  },
);

const updateChannelBanner = createAsyncThunk<
  ChannelProfileUpdateResponseDto,
  ChannelProfileUpdateMediaRequestDto & DefaultRequestParam,
  AsyncThunkConfig
>(
  ActionsTypes.UPDATE_CHANNEL_BANNER,
  async ({ id, base64Str }, { extra: { channelCrudApi } }): Promise<ChannelProfileUpdateResponseDto> => {
    const channelInfo = await channelCrudApi.updateChannelBanner({
      id,
      base64Str,
    });
    return channelInfo;
  },
);

const unloadChannelInfo = createAction(ActionsTypes.UNLOAD_CHANNEL_SETTINGS);

const updateChannelSubscriptionCount = createAction<number>(ActionsTypes.UPDATE_CHANNEL_SUBSCRIPTION_COUNT);

export {
  loadChannel,
  loadMyChannelInfo,
  unloadChannelInfo,
  updateChannelInfo,
  updateChannelAvatar,
  updateChannelBanner,
  updateChannelSubscriptionCount,
};
