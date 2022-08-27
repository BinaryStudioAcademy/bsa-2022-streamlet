import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig, CreateSubscriptionResponseDto } from 'common/types/types';
import { VideoExpandedResponseDto } from 'shared/build';
import { ActionType } from './common';

const getVideo = createAsyncThunk<VideoExpandedResponseDto, string, AsyncThunkConfig>(
  ActionType.GET_VIDEO,
  async (videoId: string, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.getSingleVideo(videoId);
  },
);

const videoChannelSubscribe = createAsyncThunk<CreateSubscriptionResponseDto, string, AsyncThunkConfig>(
  ActionType.SUBSCRIBE_TOGGLE,
  async (channelId: string, { extra }) => {
    const { channelSubscriptionApi } = extra;

    return await channelSubscriptionApi.createSubscription(channelId);
  },
);

export { getVideo, videoChannelSubscribe };
