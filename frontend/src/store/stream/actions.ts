import { createAsyncThunk } from '@reduxjs/toolkit/dist';
import { AsyncThunkConfigHttpError } from 'common/types/app/async-thunk-config.type';
import { serializeHttpError } from 'helpers/helpers';
import {
  CreateStreamRequestDto,
  DefaultRequestParam,
  HttpError,
  StreamLiveStatusRequestDto,
  StreamPosterUploadRequestDto,
  StreamUpdateRequestDto,
  VideoStreamResponseDto,
} from 'shared/build';
import { ActionType } from './common';

const createStream = createAsyncThunk<VideoStreamResponseDto, CreateStreamRequestDto, AsyncThunkConfigHttpError>(
  ActionType.CREATE_STREAM,
  async (payload, { extra: { channelStreamingApi }, rejectWithValue }) => {
    try {
      return await channelStreamingApi.createStream(payload);
    } catch (error) {
      if (error instanceof HttpError) {
        return rejectWithValue(serializeHttpError(error));
      }
      throw error;
    }
  },
);

const uploadPoster = createAsyncThunk<VideoStreamResponseDto, StreamPosterUploadRequestDto, AsyncThunkConfigHttpError>(
  ActionType.UPLOAD_POSTER,
  async (payload, { extra: { channelStreamingApi }, rejectWithValue }) => {
    try {
      return await channelStreamingApi.uploadPoster(payload);
    } catch (error) {
      if (error instanceof HttpError) {
        return rejectWithValue(serializeHttpError(error));
      }
      throw error;
    }
  },
);

const editStream = createAsyncThunk<VideoStreamResponseDto, StreamUpdateRequestDto, AsyncThunkConfigHttpError>(
  ActionType.UPDATE_STREAM_DATA,
  async (payload, { extra: { channelStreamingApi }, rejectWithValue }) => {
    try {
      return await channelStreamingApi.editStream(payload);
    } catch (error) {
      if (error instanceof HttpError) {
        return rejectWithValue(serializeHttpError(error));
      }
      throw error;
    }
  },
);

const getStreamData = createAsyncThunk<VideoStreamResponseDto, DefaultRequestParam, AsyncThunkConfigHttpError>(
  ActionType.GET_STREAM_DATA,
  async ({ id }, { extra: { channelStreamingApi }, rejectWithValue }) => {
    try {
      return await channelStreamingApi.getCurrentStream({ id });
    } catch (error) {
      if (error instanceof HttpError) {
        return rejectWithValue(serializeHttpError(error));
      }
      throw error;
    }
  },
);

const setStreamStatus = createAsyncThunk<VideoStreamResponseDto, StreamLiveStatusRequestDto, AsyncThunkConfigHttpError>(
  ActionType.SET_STREAMING_STATUS,
  async (payload, { extra: { channelStreamingApi }, rejectWithValue }) => {
    try {
      return await channelStreamingApi.setStreamStatus(payload);
    } catch (error) {
      if (error instanceof HttpError) {
        return rejectWithValue(serializeHttpError(error));
      }
      throw error;
    }
  },
);

export { createStream, uploadPoster, editStream, getStreamData, setStreamStatus };
