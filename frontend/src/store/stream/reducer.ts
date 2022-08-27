import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { createStream, uploadPoster, updateStreamData, getStreamData, changeStreamStatus } from './action';
import { VideoStreamResponseDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  currentStreamData: VideoStreamResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: undefined,
  currentStreamData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addMatcher(
    isAnyOf(
      createStream.pending,
      uploadPoster.pending,
      updateStreamData.pending,
      getStreamData.pending,
      changeStreamStatus.pending,
    ),
    (state) => {
      return {
        ...state,
        dataStatus: DataStatus.PENDING,
        error: undefined,
      };
    },
  );
  builder.addMatcher(
    isAnyOf(
      createStream.fulfilled,
      uploadPoster.fulfilled,
      updateStreamData.fulfilled,
      getStreamData.fulfilled,
      changeStreamStatus.fulfilled,
    ),
    (_state, { payload }) => {
      return {
        dataStatus: DataStatus.FULFILLED,
        error: undefined,
        currentStreamData: payload,
      };
    },
  );
  builder.addMatcher(
    isAnyOf(
      createStream.rejected,
      uploadPoster.rejected,
      updateStreamData.rejected,
      getStreamData.rejected,
      changeStreamStatus.rejected,
    ),
    (state, { error }) => {
      const { message: errorMessage } = error;
      return {
        dataStatus: DataStatus.REJECTED,
        error: errorMessage,
        currentStreamData: null,
      };
    },
  );
});

export { reducer };
