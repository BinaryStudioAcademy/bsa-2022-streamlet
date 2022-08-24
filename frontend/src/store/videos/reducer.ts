import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { getVideos } from './actions';

type State = {
  data: DataVideo;
  dataStatus: DataStatus;
  error: boolean;
};

const initialState: State = {
  data: {
    list: [],
    total: 0,
  },
  dataStatus: DataStatus.IDLE,
  error: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getVideos.pending, (state) => {
    state.error = false;
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(getVideos.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.data.list = payload.list;
    state.data.total = payload.total;
  });

  builder.addCase(getVideos.rejected, (state) => {
    state.error = true;
  });
});

export { reducer };
