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
      lastListLength: number;
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
      currentPage: -1,
      lastPage: -1,
      lastListLength: 0,
    },
  },
  dataStatus: DataStatus.IDLE,
  error: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getVideos.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.data.list = payload.list;
    state.data.total = payload.total;
  });

  builder.addCase(getVideosByCategory.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.data.list = payload.list;
    state.data.total = payload.total;
  });

  builder.addCase(getPopularVideos.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.error = false;

    const { list } = payload;

    state.data.popular = {
      ...payload,
      lastListLength: list.length,
    };
  });

  builder.addCase(getPopularVideos.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
    state.error = false;
    state.data.popular.list = [];
  });

  builder.addMatcher(isAnyOf(getVideosByCategory.rejected, getVideos.rejected, getPopularVideos.rejected), (state) => {
    state.error = true;
  });

  builder.addMatcher(isAnyOf(getVideosByCategory.pending, getVideos.pending), (state) => {
    state.error = false;
    state.dataStatus = DataStatus.PENDING;
  });
});

export { reducer };
