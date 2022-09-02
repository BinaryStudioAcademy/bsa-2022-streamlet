import { createAsyncThunk } from '@reduxjs/toolkit/dist';
import { AsyncThunkConfigHttpError } from 'common/types/app/async-thunk-config.type';
import { serializeHttpError } from 'helpers/helpers';
import {
  CreateStreamRequestDto,
  HttpError,
  OwnChannelResponseDto,
  ResetStreamingKeyRequestDto,
  StreamingInfoResponseDto,
  StreamingKeyResponseDto,
  StreamLiveStatusRequestDto,
  StreamPosterUploadRequestDto,
  StreamReadinessRequestDto,
  StreamUpdateRequestDto,
  VideoStreamResponseDto,
} from 'shared/build';
import { ActionType } from './common';

const createStream = createAsyncThunk<VideoStreamResponseDto, CreateStreamRequestDto, AsyncThunkConfigHttpError>(
  ActionType.CREATE_STREAM,
  async (payload, { extra: { channelStreamingApi }, rejectWithValue }) => {
    try {
      const newStream = await channelStreamingApi.createStream(payload);
      return newStream;
    } catch (error) {
      if (error instanceof HttpError) {
        return rejectWithValue(serializeHttpError(error));
      }
      throw error;
    }
  },
);

const getMyChannel = createAsyncThunk<OwnChannelResponseDto, void, AsyncThunkConfigHttpError>(
  ActionType.GET_MY_CHANNEL,
  async (_payload, { extra: { channelCrudApi }, rejectWithValue }) => {
    try {
      return await channelCrudApi.getMyChannelInfo();
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

const getStreamingInfo = createAsyncThunk<StreamingInfoResponseDto, void, AsyncThunkConfigHttpError>(
  ActionType.GET_STREAM_DATA,
  async (_payload, { extra: { channelStreamingApi }, rejectWithValue }) => {
    try {
      return await channelStreamingApi.getStreamingInfo();
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

const setReadinessToStream = createAsyncThunk<
  VideoStreamResponseDto,
  StreamReadinessRequestDto,
  AsyncThunkConfigHttpError
>(ActionType.SET_READINESS_TO_STREAM, async (payload, { extra: { channelStreamingApi }, rejectWithValue }) => {
  try {
    return await channelStreamingApi.setReadinessToStream(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return rejectWithValue(serializeHttpError(error));
    }
    throw error;
  }
});

const resetStreamingKey = createAsyncThunk<
  StreamingKeyResponseDto,
  ResetStreamingKeyRequestDto,
  AsyncThunkConfigHttpError
>(ActionType.RESET_STREAMING_KEY, async (payload, { extra: { channelStreamingApi }, rejectWithValue }) => {
  try {
    return await channelStreamingApi.resetStreamingKey(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return rejectWithValue(serializeHttpError(error));
    }
    throw error;
  }
});

export {
  createStream,
  uploadPoster,
  editStream,
  getStreamingInfo,
  setStreamStatus,
  resetStreamingKey,
  getMyChannel,
  setReadinessToStream,
};
