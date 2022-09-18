import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { UpdateVideoInfoDto, UpdateVideoVisibilityDto, VideoInfoDto } from 'shared/build';
import { ActionType } from './common';

const getMyVideos = createAsyncThunk<VideoInfoDto[], void, AsyncThunkConfig>(
  ActionType.GET_MY_VIDEOS,
  async (_payload, { extra: { videoApi } }) => {
    const data = await videoApi.getMyVideos();
    return data;
  },
);
const changePrivacy = createAsyncThunk<VideoInfoDto, UpdateVideoVisibilityDto & { authorId: string }, AsyncThunkConfig>(
  ActionType.CHANGE_PRIVACY,
  async (payload, { extra: { videoApi } }) => {
    const updatedVideo = await videoApi.editVisibility(payload);

    return updatedVideo;
  },
);

const editInfo = createAsyncThunk<VideoInfoDto, UpdateVideoInfoDto & { authorId: string }, AsyncThunkConfig>(
  ActionType.EDIT_INFO,
  async (payload, { extra: { videoApi } }) => {
    const updatedVideo = await videoApi.editVideo(payload);
    return updatedVideo;
  },
);

const unloadVideos = createAction(ActionType.UNLOAD_VIDEOS);
const pickVideo = createAction<{ id: string }>(ActionType.PICK_VIDEO);
const pickAllVideo = createAction<{ isPick: boolean }>(ActionType.PICK_ALL_VIDEO);

export { getMyVideos, unloadVideos, pickVideo, pickAllVideo, changePrivacy, editInfo };
