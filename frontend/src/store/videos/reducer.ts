import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { BaseVideoResponseDto, DataVideo } from 'shared/build';
import {
  getGeneralVideosBlock,
  getPopularVideos,
  getRecommendedVideos,
  getVideos,
  getVideosByCategory,
  resetGeneralVideos,
  resetPaginationMainPage,
  resetRecommendedVideos,
  setNumberOfVideoForLoading,
} from './actions';

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
  } & {
    generalVideos: {
      list: BaseVideoResponseDto[];
      total: number;
    };
  } & {
    recommendedVideos: {
      list: BaseVideoResponseDto[];
      total: number;
      status: DataStatus;
      currentPage: number;
      numbersOfGetVideos: number;
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
    generalVideos: {
      list: [],
      total: 0,
    },
    recommendedVideos: {
      list: [],
      total: 0,
      status: DataStatus.IDLE,
      currentPage: 1,
      numbersOfGetVideos: 12,
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

  builder.addCase(setNumberOfVideoForLoading, (state, { payload }) => {
    state.pagination.countItems = payload.numberOfItems;
  });

  builder.addCase(getGeneralVideosBlock.fulfilled, (state, { payload }) => {
    state.data.generalVideos.list = payload.list;
    state.data.generalVideos.total = payload.total;
  });

  builder.addCase(getRecommendedVideos.pending, (state) => {
    state.data.recommendedVideos.status = DataStatus.PENDING;
  });

  builder.addCase(getRecommendedVideos.fulfilled, (state, { payload }) => {
    state.data.recommendedVideos.status = DataStatus.FULFILLED;
    state.data.recommendedVideos.currentPage++;
    state.data.recommendedVideos.list = [...state.data.recommendedVideos.list, ...payload.list];
    state.data.recommendedVideos.total = payload.total;
  });

  builder.addCase(getRecommendedVideos.rejected, (state) => {
    state.data.recommendedVideos.status = DataStatus.REJECTED;
    state.data.recommendedVideos.list = [];
    state.data.recommendedVideos.total = 0;
  });

  builder.addCase(resetRecommendedVideos, (state) => {
    state.data.recommendedVideos.list = [];
    state.data.recommendedVideos.currentPage = 1;
    state.data.recommendedVideos.total = 0;
    state.data.recommendedVideos.status = DataStatus.IDLE;
  });

  builder.addCase(resetGeneralVideos, (state) => {
    state.data.generalVideos.list = [];
    state.data.generalVideos.total = 0;
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
