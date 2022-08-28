import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { DataVideo } from 'shared/build';
import { ActionType } from './common';

const getVideos = createAsyncThunk<DataVideo, void, AsyncThunkConfig>(
  ActionType.GET_VIDEOS,
  async (_payload, { extra: { videoApi } }) => {
    const data = await videoApi.getVideos();
    return data;
  },
);

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
      list: data,
      total: data.length,
    };
  },
);

export { getVideos, getVideosByCategory };
