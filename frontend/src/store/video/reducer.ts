import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { VideoBaseResponseDto } from 'common/types/types';
import { getVideo, videoChannelSubscribe } from './action';

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  video: VideoBaseResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  video: null,
  error: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getVideo.fulfilled, (state, { payload }) => {
    state.video = payload;
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(videoChannelSubscribe.fulfilled, (state, { payload }) => {
    if (state.video) {
      state.video.isUserSubscribeOnVideoChannel = payload.isSubscribe;
    }
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(getVideo.pending, (state) => {
    state.error = undefined;
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getVideo.rejected, (state, { error }) => {
    state.dataStatus = DataStatus.REJECTED;
    state.error = error.message;
  });
});

export { reducer };
