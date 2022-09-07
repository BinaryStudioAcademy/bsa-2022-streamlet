import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { BaseVideoResponseDto, DataVideo } from 'shared/build';
import { getPopularVideos, getVideos, getVideosByCategory, resetPaginationMainPage } from './actions';

type State = {
  data: DataVideo & {
    popular: {
      list: BaseVideoResponseDto[];
      firstLoad: boolean;
      currentPage: number;
      lastPage: number;
      lastListLength: number;
      category: string;
    };
  };
  pagination: {
    currentPage: number;
    countItems: number;
    lazyLoad: boolean;
  };
  dataStatus: DataStatus;
  error: boolean;
};

const initialState: State = {
  data: {
    list: [],
    total: 0,
    popular: {
      firstLoad: true,

      list: [],
      currentPage: -1,
      lastPage: -1,
      lastListLength: 0,
      category: '',
    },
  },
  pagination: {
    currentPage: 1,
    countItems: 12,
    lazyLoad: false,
  },
  dataStatus: DataStatus.IDLE,
  error: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getVideos.fulfilled, (state, { payload }) => {
    if (payload.lazyLoad) {
      state.dataStatus = DataStatus.FULFILLED;
      state.data.list = [...state.data.list, ...payload.list];
      state.data.total = payload.total;
      state.pagination.currentPage += 1;
      state.pagination.lazyLoad = payload.lazyLoad;

      if (state.data.list.length >= state.data.total) {
        state.pagination.lazyLoad = false;
      }

      return;
    }

    state.dataStatus = DataStatus.FULFILLED;
    state.data.list = payload.list;
    state.data.total = payload.total;
  });

  builder.addCase(resetPaginationMainPage, (state) => {
    state.pagination.lazyLoad = false;
    state.pagination.currentPage = 1;
    state.data.list = [];
  });

  builder.addCase(getVideosByCategory.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.data.list = payload.list;
    state.data.total = payload.total;
  });

  builder.addCase(getPopularVideos.fulfilled, (state, { payload }) => {
    const { list } = payload;

    state.data.popular = {
      firstLoad: false,
      ...payload,
      lastListLength: list.length,
    };

    state.dataStatus = DataStatus.FULFILLED;
    state.error = false;
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
