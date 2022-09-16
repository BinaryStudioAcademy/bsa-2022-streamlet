import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { VideoInfoDto, VideoPrivacy } from 'shared/build';
import { ActionType } from './common';

const getMyVideos = createAsyncThunk<VideoInfoDto[], void, AsyncThunkConfig>(
  ActionType.GET_MY_VIDEOS,
  async (_payload, { extra: { videoApi } }) => {
    const data = await videoApi.getMyVideos();
    return data;
  },
);
const changePrivacy = createAsyncThunk<
  { privacy: VideoPrivacy; id: string },
  { privacy: VideoPrivacy; id: string },
  AsyncThunkConfig
>(ActionType.CHANGE_PRIVACY, async (_payload) => {
  return {
    ..._payload,
  };
});

const unloadVideos = createAction(ActionType.UNLOAD_VIDEOS);
const pickVideo = createAction<{ id: string }>(ActionType.PICK_VIDEO);
const pickAllVideo = createAction<{ isPick: boolean }>(ActionType.PICK_ALL_VIDEO);

export { getMyVideos, unloadVideos, pickVideo, pickAllVideo, changePrivacy };
