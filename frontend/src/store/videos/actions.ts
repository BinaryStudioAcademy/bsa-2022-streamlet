import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { ActionType } from './common';

const getVideos = createAsyncThunk<DataVideo, void, AsyncThunkConfig>(
  ActionType.GET_VIDEOS,
  async (_payload, { extra: { videoApi } }) => {
    const data = await videoApi.getVideos();
    return data;
  },
);

export { getVideos };
