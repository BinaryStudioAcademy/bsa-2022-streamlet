import { createAsyncThunk } from '@reduxjs/toolkit/dist';
import { AsyncThunkConfigHttpError } from 'common/types/app/async-thunk-config.type';
import { serializeHttpError } from 'helpers/helpers';
import {
  CreateStreamRequestDto,
  HttpError,
  OwnChannelResponseDto,
  ResetStreamingKeyRequestDto,
  StreamingKeyResponseDto,
  StreamLiveStatusRequestDto,
  StreamPosterUploadRequestDto,
  StreamUpdateRequestDto,
  VideoStreamResponseDto,
} from 'shared/build';
import { ActionType, StreamData } from './common';

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

const getStreamData = createAsyncThunk<StreamData, void, AsyncThunkConfigHttpError>(
  ActionType.GET_STREAM_DATA,
  async (_payload, { extra: { channelStreamingApi, channelCrudApi }, rejectWithValue }) => {
    try {
      const channel = await channelCrudApi.getMyChannelInfo();
      const stream = await channelStreamingApi.getCurrentStream({ id: channel.id });
      const streamingKey = await channelStreamingApi.getStreamingKey({ id: channel.id });
      return {
        channel,
        stream,
        streamingKey: streamingKey.streamingKey,
      };
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

export { createStream, uploadPoster, editStream, getStreamData, setStreamStatus, resetStreamingKey, getMyChannel };
