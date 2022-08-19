import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig, VideoBaseResponseDto } from 'common/types/types';
import { ActionType } from './common';

const getVideo = createAsyncThunk<VideoBaseResponseDto, string, AsyncThunkConfig>(
  ActionType.GET_VIDEO,
  async (videoId: string, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.getVideoData(videoId);
  },
);

export { getVideo };
