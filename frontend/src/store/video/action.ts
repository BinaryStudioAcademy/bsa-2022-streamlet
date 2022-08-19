import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig, CreateSubscriptionResponseDto, VideoBaseResponseDto } from 'common/types/types';
import { ActionType } from './common';

const getVideo = createAsyncThunk<VideoBaseResponseDto, string, AsyncThunkConfig>(
  ActionType.GET_VIDEO,
  async (videoId: string, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.getVideoData(videoId);
  },
);

const videoChannelSubscribe = createAsyncThunk<CreateSubscriptionResponseDto, string, AsyncThunkConfig>(
  ActionType.SUBSCRIBE,
  async (channelId: string, { extra }) => {
    const { channelApi } = extra;

    return await channelApi.createSubscription(channelId);
  },
);

export { getVideo, videoChannelSubscribe };
