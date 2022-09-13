import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus, IconName, StreamStatus } from 'common/enums/enums';
import {
  createStream,
  uploadPoster,
  editStream,
  getStreamingInfo,
  setStreamStatus,
  resetStreamingKey,
  getMyChannel,
  setReadinessToStream,
  resetTemporaryPoster,
} from './actions';
import { OwnChannelResponseDto, VideoStreamResponseDto } from 'common/types/types';
import { getRejectedErrorData } from 'helpers/redux/get-rejected-error-data';
import { createToastNotification } from 'components/common/toast-notification';

type State = {
  stream: VideoStreamResponseDto | null;
  channel: OwnChannelResponseDto | null;
  streamingKey: string | null;
  status: {
    dataStatus: DataStatus;
    error: string | undefined;
    errorCode: string | undefined;
  };
  temporaryPoster: string | null;
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
  temporaryPoster: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getStreamingInfo.fulfilled, (state, { payload }) => {
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
  builder.addCase(uploadPoster.fulfilled, (state, { payload }) => {
    state.status.dataStatus = DataStatus.FULFILLED;
    if (state.stream) {
      state.temporaryPoster = payload.poster;
    }
  });
  builder.addCase(resetTemporaryPoster.fulfilled, (state) => {
    state.temporaryPoster = state.stream?.poster ?? null;
  });
  builder.addCase(setStreamStatus.fulfilled, (state, { payload }) => {
    state.status.dataStatus = DataStatus.FULFILLED;
    if (payload.status === StreamStatus.LIVE) {
      state.stream = payload;
    } else if (payload.status === StreamStatus.FINISHED) {
      state.stream = null;
      createToastNotification({
        iconName: IconName.SMILE,
        title: 'Stream finished!',
        message: 'You have finished the stream!',
        type: 'success',
      });
    }
  });
  builder.addMatcher(
    isAnyOf(resetStreamingKey.pending, uploadPoster.pending, setReadinessToStream.pending, editStream.pending),
    (state) => {
      state.status.error = undefined;
      state.status.errorCode = undefined;
    },
  );
  builder.addMatcher(
    isAnyOf(createStream.pending, setStreamStatus.pending, getStreamingInfo.pending, getMyChannel.pending),
    (state) => {
      state.status.dataStatus = DataStatus.PENDING;
      state.status.error = undefined;
      state.status.errorCode = undefined;
    },
  );
  builder.addMatcher(
    isAnyOf(createStream.fulfilled, editStream.fulfilled, setReadinessToStream.fulfilled),
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
      setReadinessToStream.rejected,
      resetStreamingKey.rejected,
      setStreamStatus.rejected,
      getMyChannel.rejected,
      getStreamingInfo.rejected,
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
