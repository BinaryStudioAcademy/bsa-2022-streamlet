import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  CreateSubscriptionResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
} from 'common/types/types';
import { VideoExpandedResponseDto } from 'shared/build';
import { ActionType } from './common';

const getVideo = createAsyncThunk<VideoExpandedResponseDto, string, AsyncThunkConfig>(
  ActionType.GET_VIDEO,
  async (videoId: string, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.getSingleVideo(videoId);
  },
);

const addVideoComment = createAsyncThunk<VideoCommentResponseDto, VideoCommentRequestDto, AsyncThunkConfig>(
  ActionType.COMMENT,
  async (payload: VideoCommentRequestDto, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.comment(payload);
  },
);

const videoReact = createAsyncThunk<
  CreateReactionResponseDto,
  CreateReactionRequestDto & { videoId: string },
  AsyncThunkConfig
>(ActionType.REACT, async (payload, { extra }) => {
  const { videoApi } = extra;
  return await videoApi.react(payload);
});

const videoChannelSubscribe = createAsyncThunk<CreateSubscriptionResponseDto, string, AsyncThunkConfig>(
  ActionType.SUBSCRIBE_TOGGLE,
  async (channelId: string, { extra }) => {
    const { channelSubscriptionApi } = extra;

    return await channelSubscriptionApi.createSubscription(channelId);
  },
);

const updateLiveViews = createAction<number>(ActionType.UPDATE_LIVE_VIEWS);

export { getVideo, videoChannelSubscribe, videoReact, addVideoComment, updateLiveViews };
