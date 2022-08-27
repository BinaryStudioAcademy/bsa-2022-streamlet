import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CreateReactionResponseDto,
  ReactVideoActionPayloadType,
  VideoBaseResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
} from 'common/types/types';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { ActionType } from './common';

const getVideos = createAsyncThunk<DataVideo, void, AsyncThunkConfig>(
  ActionType.GET_VIDEOS,
  async (_payload, { extra: { videoApi } }) => {
    const data = await videoApi.getVideos();
    return data;
  },
);

const getVideo = createAsyncThunk<VideoBaseResponseDto, string, AsyncThunkConfig>(
  ActionType.GET_VIDEO,
  async (videoId: string, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.getVideoDataVideoPage(videoId);
  },
);

/*const videoChannelSubscribe = createAsyncThunk<CreateSubscriptionResponseDto, string, AsyncThunkConfig>(
  ActionType.SUBSCRIBE,
  async (channelId: string, { extra }) => {
    const { channelApi } = extra;

    return await channelApi.createSubscription(channelId);
  },
);*/

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

export { getVideos, videoReact, addVideoComment, getVideo };
