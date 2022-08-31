import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { VideosLiveResponseDto, VideosOfflineResponseDto } from 'shared/build';
import { ActionType } from './common';

const loadOfflineVideos = createAsyncThunk<VideosOfflineResponseDto, void, AsyncThunkConfig>(
  ActionType.LOAD_OFFLINE_VIDEOS,
  (_, { extra: { followingApi } }) => {
    return followingApi.loadOfflineVideos();
  },
);

const loadLiveVideos = createAsyncThunk<VideosLiveResponseDto, void, AsyncThunkConfig>(
  ActionType.LOAD_LIVE_VIDEOS,
  (_, { extra: { followingApi } }) => {
    return followingApi.loadLiveVideos();
  },
);

export { loadOfflineVideos, loadLiveVideos };
