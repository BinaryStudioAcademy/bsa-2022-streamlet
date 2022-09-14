import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { DataVideo, PopularVideoResponseDto, PopularVideosRequestDtoType } from 'shared/build';
import { ActionType, PayloadForNumberItems } from './common';

const getVideos = createAsyncThunk<DataVideo, Record<'withLazyLoad', boolean> | undefined, AsyncThunkConfig>(
  ActionType.GET_VIDEOS,
  async (payload, { extra: { videoApi }, getState }) => {
    const { countItems, currentPage } = getState().videos.pagination;

    if (payload?.withLazyLoad) {
      const paginationParams = {
        skip: (currentPage - 1) * countItems,
        take: countItems,
      };

      const data = await videoApi.getVideos(paginationParams);
      return data;
    }

    const data = await videoApi.getVideos();
    return data;
  },
);

const getGeneralVideosBlock = createAsyncThunk<DataVideo, void, AsyncThunkConfig>(
  ActionType.GET_GENERAL_VIDEOS,
  async (_payload, { extra: { videoApi } }) => {
    return await videoApi.getGeneralVideos();
  },
);

const getRecommendedVideos = createAsyncThunk<DataVideo, void, AsyncThunkConfig>(
  ActionType.GET_RECOMMENDED_VIDEOS,
  async (_payload, { extra: { videoApi }, getState }) => {
    const { numbersOfGetVideos, currentPage } = getState().videos.data.recommendedVideos;

    const paginationParams = {
      skip: (currentPage - 1) * numbersOfGetVideos,
      take: numbersOfGetVideos,
    };

    const data = await videoApi.getRecommendedVideos(paginationParams);
    return data;
  },
);

const resetRecommendedVideos = createAction(ActionType.RESET_RECOMMENDED_VIDEOS);

const resetGeneralVideos = createAction(ActionType.RESET_GENERAL_VIDEOS);

const getVideosByCategory = createAsyncThunk<DataVideo, void, AsyncThunkConfig>(
  ActionType.GET_VIDEOS_BY_CATEGORY,
  async (_, { extra: { categoryApi, videoApi }, getState }) => {
    const pickedCategories = getState()
      .category.data.filter((category) => category.isActive)
      .map((category) => category.name);
    if (!pickedCategories.length) {
      const data = await videoApi.getVideos();
      return data;
    }
    const data = await categoryApi.searchByCategories(pickedCategories);
    return {
      list: data.list,
      total: data.totalVideosNum,
    };
  },
);

const getPopularVideos = createAsyncThunk<PopularVideoResponseDto, PopularVideosRequestDtoType, AsyncThunkConfig>(
  ActionType.GET_POPULAR_VIDEOS,
  async (payload, { extra: { videoApi } }) => {
    return await videoApi.getPopular(payload);
  },
);

const resetPaginationMainPage = createAction(ActionType.RESET_PAGINATION_MAIN_PAGE);
const setNumberOfVideoForLoading = createAction<PayloadForNumberItems>(ActionType.SET_NUMBER_OF_VIDEO_FOR_LOADING);

export {
  getVideos,
  getVideosByCategory,
  getPopularVideos,
  resetPaginationMainPage,
  setNumberOfVideoForLoading,
  getGeneralVideosBlock,
  getRecommendedVideos,
  resetRecommendedVideos,
  resetGeneralVideos,
};
