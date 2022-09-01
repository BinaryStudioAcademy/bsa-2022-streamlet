import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { BaseVideoResponseDto, DataVideo } from 'shared/build';
import { getPopularVideos, getVideos, getVideosByCategory } from './actions';

type State = {
  data: DataVideo & {
    popular: {
      list: BaseVideoResponseDto[];
      currentPage: number;
      lastPage: number;
    };
  };
  dataStatus: DataStatus;
  error: boolean;
};

const initialState: State = {
  data: {
    list: [],
    total: 0,
    popular: {
      list: [],
      currentPage: 1,
      lastPage: 1,
    },
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

  builder.addCase(getVideosByCategory.pending, (state) => {
    state.error = false;
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(getVideosByCategory.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.data.list = payload.list;
    state.data.total = payload.total;
  });

  builder.addCase(getPopularVideos.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.error = false;
    state.data.popular = {
      ...payload,
    };
  });

  builder.addMatcher(isAnyOf(getVideosByCategory.rejected, getVideos.rejected, getPopularVideos.rejected), (state) => {
    state.error = true;
  });
});

export { reducer };
