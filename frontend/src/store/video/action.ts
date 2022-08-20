import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  CreateReactionResponseDto,
  CreateSubscriptionResponseDto,
  ReactVideoActionPayloadType,
  VideoBaseResponseDto,
} from 'common/types/types';
import { ActionType } from './common';
import { type VideoCommentRequestDto, type VideoCommentResponseDto } from '../../common/types/types';

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

const addVideoComment = createAsyncThunk<VideoCommentResponseDto, VideoCommentRequestDto, AsyncThunkConfig>(
  ActionType.COMMENT,
  async (payload: VideoCommentRequestDto, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.comment(payload);
  },
);

const videoReact = createAsyncThunk<CreateReactionResponseDto, ReactVideoActionPayloadType, AsyncThunkConfig>(
  ActionType.REACT,
  async (payload: ReactVideoActionPayloadType, { extra }) => {
    const { videoApi } = extra;
    return await videoApi.react(payload);
  },
);

export { getVideo, videoChannelSubscribe, videoReact, addVideoComment };
