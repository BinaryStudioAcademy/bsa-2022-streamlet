import { createAsyncThunk } from '@reduxjs/toolkit/dist';
import { AsyncThunkConfig } from 'common/types/types';
import {
  CreateStreamRequestDto,
  DefaultRequestParam,
  StreamPosterUploadRequestDto,
  StreamUpdateRequestDto,
  VideoStreamResponseDto,
} from 'shared/build';
import { ActionType } from './common';

const createStream = createAsyncThunk<VideoStreamResponseDto, CreateStreamRequestDto, AsyncThunkConfig>(
  ActionType.CREATE_STREAM,
  async (payload, { extra }) => {
    const { channelStreamingApi } = extra;

    return channelStreamingApi.createStream(payload);
  },
);

const uploadPoster = createAsyncThunk<VideoStreamResponseDto, StreamPosterUploadRequestDto, AsyncThunkConfig>(
  ActionType.UPLOAD_POSTER,
  async (payload, { extra }) => {
    const { channelStreamingApi } = extra;

    return channelStreamingApi.uploadPoster(payload);
  },
);

const updateStreamData = createAsyncThunk<VideoStreamResponseDto, StreamUpdateRequestDto, AsyncThunkConfig>(
  ActionType.UPDATE_STREAM_DATA,
  async (payload, { extra }) => {
    const { channelStreamingApi } = extra;

    return channelStreamingApi.updateStreamData(payload);
  },
);

const getStreamData = createAsyncThunk<VideoStreamResponseDto, DefaultRequestParam, AsyncThunkConfig>(
  ActionType.GET_STREAM_DATA,
  async ({ id }, { extra }) => {
    const { channelStreamingApi } = extra;

    return channelStreamingApi.getStreamData(id);
  },
);

const setStreamStatus = createAsyncThunk<VideoStreamResponseDto, StreamUpdateRequestDto, AsyncThunkConfig>(
  ActionType.SET_STREAMING_STATUS,
  async (payload, { extra }) => {
    const { channelStreamingApi } = extra;

    return channelStreamingApi.setStreamStatus(payload);
  },
);

export { createStream, uploadPoster, updateStreamData, getStreamData, setStreamStatus };
