import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { VideoInfoDto } from 'shared/build';
import { getMyVideos, unloadVideos } from './actions';

type State = {
  data: VideoInfoDto[];
  dataStatus: DataStatus;
  error: boolean;
};

const initialState: State = {
  data: [] as VideoInfoDto[],
  dataStatus: DataStatus.IDLE,
  error: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getMyVideos.pending, (state) => {
    state.error = false;
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getMyVideos.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.data = payload;
  });
  builder.addCase(getMyVideos.rejected, (state) => {
    state.error = true;
    state.data = [];
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(unloadVideos, (state) => {
    state.error = false;
    state.data = [];
    state.dataStatus = DataStatus.IDLE;
  });
});

export { reducer };
