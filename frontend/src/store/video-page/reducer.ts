import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { BaseVideoResponseDto, Comment, VideoExpandedResponseDto } from 'shared/build';
import { channelSubscribe } from 'store/subscriptions/actions';
import {
  addVideoComment,
  getVideo,
  videoReact,
  updateLiveViews,
  getRepliesForComment,
  addVideoCommentReply,
  resetVideoPage,
  addVideoView,
  loadRecommendedVideos,
} from './actions';

type State = {
  dataStatus: DataStatus;
  subscription: {
    dataStatus: DataStatus;
    error: string | undefined;
  };
  error: string | undefined;
  video: VideoExpandedResponseDto | null;
  replies: {
    dataStatus: DataStatus;
    data: Record<string, Comment[]>;
  };
  videoView: {
    isViewed: boolean;
    dataStatus: DataStatus;
  };
  recommendedVideos: {
    videos: BaseVideoResponseDto[];
    dataStatus: DataStatus;
    error: string | undefined;
  };
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  video: null,
  error: undefined,
  subscription: {
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
  replies: {
    dataStatus: DataStatus.IDLE,
    data: {},
  },
  videoView: {
    isViewed: false,
    dataStatus: DataStatus.IDLE,
  },
  recommendedVideos: {
    dataStatus: DataStatus.IDLE,
    error: undefined,
    videos: [],
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getVideo.fulfilled, (state, { payload }) => {
    state.video = payload;
    state.videoView = { ...initialState.videoView };
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(getVideo.pending, (state) => {
    state.error = undefined;
    state.videoView = { ...initialState.videoView };
    state.dataStatus = DataStatus.PENDING;
    state.recommendedVideos = { ...initialState.recommendedVideos };
  });
  builder.addCase(getVideo.rejected, (state, { error }) => {
    state.dataStatus = DataStatus.REJECTED;
    state.error = error.message;
  });

  builder.addCase(loadRecommendedVideos.pending, (state) => {
    state.recommendedVideos.dataStatus = DataStatus.PENDING;
    state.recommendedVideos.error = undefined;
  });
  builder.addCase(loadRecommendedVideos.rejected, (state, { error }) => {
    state.recommendedVideos.dataStatus = DataStatus.REJECTED;
    state.recommendedVideos.error = error.message;
  });
  builder.addCase(loadRecommendedVideos.fulfilled, (state, { payload }) => {
    state.recommendedVideos.dataStatus = DataStatus.FULFILLED;
    state.recommendedVideos.error = undefined;
    state.recommendedVideos.videos = payload.videos;
  });

  builder.addCase(channelSubscribe.fulfilled, (state, { payload }) => {
    if (state.video) {
      state.video.isUserSubscribedOnChannel = payload.isSubscribed;
      state.video.channel.subscriberCount += payload.isSubscribed ? 1 : -1;
    }
    state.subscription.dataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(addVideoComment.fulfilled, (state, _payload) => {
    state.dataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(addVideoView.fulfilled, (state, { payload }) => {
    if (payload === true) {
      // currently, no-op, video was already viewed previously
    } else if (payload) {
      state.videoView.dataStatus = DataStatus.FULFILLED;
      state.videoView.isViewed = true;
      if (state.video) {
        state.video.videoViews = payload.currentViews;
      }
    }
    // video was not present in state yet
    else if (payload === null) {
      state.videoView = { ...initialState.videoView };
    }
  });

  builder.addCase(addVideoView.pending, (state, payload) => {
    if (payload) {
      state.videoView.dataStatus = DataStatus.PENDING;
    }
  });

  builder.addCase(addVideoView.rejected, (state, payload) => {
    if (payload) {
      state.videoView.dataStatus = DataStatus.REJECTED;
    }
  });

  builder.addCase(videoReact.fulfilled, (state, { payload }) => {
    const { likeNum, dislikeNum, isLike } = payload;
    if (state.video) {
      state.video.userReaction = isLike === null ? null : { isLike };
      state.video.likeNum = likeNum;
      state.video.dislikeNum = dislikeNum;
    }
    state.dataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(updateLiveViews, (state, { payload }) => {
    if (state.video) {
      state.video.liveViews = payload;
    }
  });

  builder.addCase(getRepliesForComment.pending, (state, _payload) => {
    state.replies.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getRepliesForComment.fulfilled, (state, { payload }) => {
    state.replies.dataStatus = DataStatus.FULFILLED;
    state.replies.data[payload.commentId] = [];
    state.replies.data[payload.commentId] = payload.data;
  });
  builder.addCase(getRepliesForComment.rejected, (state, _payload) => {
    state.replies.dataStatus = DataStatus.REJECTED;
    state.replies.data = {};
  });

  builder.addCase(addVideoCommentReply.fulfilled, (state, { payload }) => {
    state.replies.data[payload.commentId] = payload.data;
    state.replies.dataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(resetVideoPage, (state) => {
    state.video = null;
    state.replies.dataStatus = DataStatus.IDLE;
    state.replies.data = {};
  });
});

export { reducer };
