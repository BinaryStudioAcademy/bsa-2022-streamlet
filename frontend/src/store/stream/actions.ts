import { createAsyncThunk } from '@reduxjs/toolkit/dist';
import { AsyncThunkConfig } from 'common/types/types';
import {
  CreateStreamRequestDto,
  DefaultRequestParam,
  StreamLiveStatusRequestDto,
  StreamPosterUploadRequestDto,
  StreamUpdateRequestDto,
  VideoStreamResponseDto,
} from 'shared/build';
import { ActionType } from './common';

const createStream = createAsyncThunk<VideoStreamResponseDto, CreateStreamRequestDto, AsyncThunkConfig>(
  ActionType.CREATE_STREAM,
  async (payload, { extra: { channelStreamingApi } }) => {
    return channelStreamingApi.createStream(payload);
  },
);

const uploadPoster = createAsyncThunk<VideoStreamResponseDto, StreamPosterUploadRequestDto, AsyncThunkConfig>(
  ActionType.UPLOAD_POSTER,
  async (payload, { extra: { channelStreamingApi } }) => {
    return channelStreamingApi.uploadPoster(payload);
  },
);

const editStream = createAsyncThunk<VideoStreamResponseDto, StreamUpdateRequestDto, AsyncThunkConfig>(
  ActionType.UPDATE_STREAM_DATA,
  async (payload, { extra: { channelStreamingApi } }) => {
    return channelStreamingApi.editStream(payload);
  },
);

const getStreamData = createAsyncThunk<VideoStreamResponseDto, DefaultRequestParam, AsyncThunkConfig>(
  ActionType.GET_STREAM_DATA,
  async ({ id }, { extra: { channelStreamingApi } }) => {
    return channelStreamingApi.getCurrentStream({ id });
  },
);

const setStreamStatus = createAsyncThunk<VideoStreamResponseDto, StreamLiveStatusRequestDto, AsyncThunkConfig>(
  ActionType.SET_STREAMING_STATUS,
  async (payload, { extra: { channelStreamingApi } }) => {
    return channelStreamingApi.setStreamStatus(payload);
  },
);

export { createStream, uploadPoster, editStream, getStreamData, setStreamStatus };
