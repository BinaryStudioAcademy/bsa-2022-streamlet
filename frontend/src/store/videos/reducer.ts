import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { addVideoComment, getVideo, getVideos, videoReact } from './actions';
import { VideoBaseResponseDto } from 'shared/build';

type State = {
  data: DataVideo;
  dataStatus: DataStatus;
  videoForVideoPage: VideoBaseResponseDto | null;
  error: boolean;
};

const initialState: State = {
  data: {
    list: [],
    total: 0,
  },
  videoForVideoPage: null,
  dataStatus: DataStatus.IDLE,
  error: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getVideos.pending, (state) => {
    state.error = false;
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(getVideos.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.data.list = payload.list;
    state.data.total = payload.total;
  });

  builder.addCase(getVideo.fulfilled, (state, { payload }) => {
    state.videoForVideoPage = payload;
    state.dataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(addVideoComment.fulfilled, (state, { payload }) => {
    if (state.videoForVideoPage) {
      state.videoForVideoPage.comments = payload.comments;
    }
    state.dataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(videoReact.fulfilled, (state, { payload }) => {
    const { likeNum, dislikeNum, isLike } = payload;
    if (state.videoForVideoPage) {
      state.videoForVideoPage.userReaction = isLike === null ? null : { isLike };
      state.videoForVideoPage.likeNum = likeNum;
      state.videoForVideoPage.dislikeNum = dislikeNum;
    }
    state.dataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(getVideos.rejected, (state) => {
    state.error = true;
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
