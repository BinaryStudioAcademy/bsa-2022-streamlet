import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  createStream,
  uploadPoster,
  editStream,
  getStreamData,
  setStreamStatus,
  resetStreamingKey,
  getMyChannel,
} from './actions';
import { OwnChannelResponseDto, VideoStreamResponseDto } from 'common/types/types';
import { getRejectedErrorData } from 'helpers/redux/get-rejected-error-data';

type State = {
  stream: VideoStreamResponseDto | null;
  channel: OwnChannelResponseDto | null;
  streamingKey: string | null;
  status: {
    dataStatus: DataStatus;
    error: string | undefined;
    errorCode: string | undefined;
  };
};

const initialState: State = {
  stream: null,
  channel: null,
  streamingKey: null,
  status: {
    dataStatus: DataStatus.IDLE,
    error: undefined,
    errorCode: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getStreamData.fulfilled, (state, { payload }) => {
    state.status.dataStatus = DataStatus.FULFILLED;
    state.channel = payload.channel;
    state.stream = payload.stream;
    state.streamingKey = payload.streamingKey;
  });
  builder.addCase(resetStreamingKey.fulfilled, (state, { payload }) => {
    state.status.dataStatus = DataStatus.FULFILLED;
    state.streamingKey = payload.streamingKey;
  });
  builder.addCase(getMyChannel.fulfilled, (state, { payload }) => {
    state.status.dataStatus = DataStatus.FULFILLED;
    state.channel = payload;
  });
  builder.addMatcher(
    isAnyOf(
      createStream.pending,
      uploadPoster.pending,
      editStream.pending,
      setStreamStatus.pending,
      resetStreamingKey.pending,
      getStreamData.pending,
      getMyChannel.pending,
    ),
    (state) => {
      state.status.dataStatus = DataStatus.PENDING;
      state.status.error = undefined;
      state.status.errorCode = undefined;
    },
  );
  builder.addMatcher(
    isAnyOf(createStream.fulfilled, uploadPoster.fulfilled, editStream.fulfilled, setStreamStatus.fulfilled),
    (state, { payload }) => {
      state.status.dataStatus = DataStatus.FULFILLED;
      state.stream = payload;
    },
  );
  builder.addMatcher(
    isAnyOf(
      createStream.rejected,
      uploadPoster.rejected,
      editStream.rejected,
      resetStreamingKey.rejected,
      setStreamStatus.rejected,
      getMyChannel.rejected,
      getStreamData.rejected,
    ),
    (state, { error, payload }) => {
      const { errorCode, message } = getRejectedErrorData(error, payload);
      state.status.dataStatus = DataStatus.REJECTED;
      state.status.error = message;
      state.status.errorCode = errorCode;
    },
  );
});

export { reducer };
