import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { createStream, uploadPoster, editStream, getStreamData, setStreamStatus } from './actions';
import { VideoStreamResponseDto } from 'common/types/types';
import { getRejectedErrorData } from 'helpers/redux/get-rejected-error-data';

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  errorCode: string | undefined;
  currentStreamData: VideoStreamResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: undefined,
  errorCode: undefined,
  currentStreamData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addMatcher(
    isAnyOf(
      createStream.pending,
      uploadPoster.pending,
      editStream.pending,
      getStreamData.pending,
      setStreamStatus.pending,
    ),
    (state) => {
      return {
        ...state,
        dataStatus: DataStatus.PENDING,
        error: undefined,
        errorCode: undefined,
      };
    },
  );
  builder.addMatcher(
    isAnyOf(
      createStream.fulfilled,
      uploadPoster.fulfilled,
      editStream.fulfilled,
      getStreamData.fulfilled,
      setStreamStatus.fulfilled,
    ),
    (state, { payload }) => {
      return {
        ...state,
        dataStatus: DataStatus.FULFILLED,
        currentStreamData: payload,
      };
    },
  );
  builder.addMatcher(
    isAnyOf(
      createStream.rejected,
      uploadPoster.rejected,
      editStream.rejected,
      getStreamData.rejected,
      setStreamStatus.rejected,
    ),
    (state, { error, payload }) => {
      const { errorCode, message } = getRejectedErrorData(error, payload);
      return {
        ...state,
        dataStatus: DataStatus.REJECTED,
        error: message,
        errorCode: errorCode,
      };
    },
  );
});

export { reducer };
