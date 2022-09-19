import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { removeItemIfExists, replaceItemIfExists } from 'helpers/helpers';
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
  deleteComment,
  updateComment,
  setNumberOfLoadingVideo,
  getVideoWithoutRecommended,
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
    numbersOfGetVideos: number;
    total: number;
    currentPage: number;
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
    currentPage: 1,
    numbersOfGetVideos: 12,
    total: 0,
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
    state.recommendedVideos.dataStatus = DataStatus.IDLE;
    state.recommendedVideos.currentPage = 1;
    state.recommendedVideos.videos = [];
    state.recommendedVideos.total = 0;
    state.recommendedVideos.error = undefined;
  });
  builder.addCase(getVideo.rejected, (state, { error }) => {
    state.dataStatus = DataStatus.REJECTED;
    state.error = error.message;
  });

  builder.addCase(getVideoWithoutRecommended.fulfilled, (state, { payload }) => {
    state.video = payload;
    state.videoView = { ...initialState.videoView };
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(getVideoWithoutRecommended.pending, (state) => {
    state.error = undefined;
    state.videoView = { ...initialState.videoView };
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getVideoWithoutRecommended.rejected, (state, { error }) => {
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
    state.recommendedVideos.currentPage++;
    state.recommendedVideos.total = payload.total;
    state.recommendedVideos.videos = [...state.recommendedVideos.videos, ...payload.list];
  });

  builder.addCase(setNumberOfLoadingVideo, (state, { payload }) => {
    state.recommendedVideos.numbersOfGetVideos = payload;
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

  builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
    if (!state.video || state.video.comments.length === 0) {
      return state;
    }
    if ('commentId' in payload) {
      if (payload.parentId && payload.parentId in state.replies.data) {
        const replies = [...state.replies.data[payload.parentId]];
        state.replies.data[payload.parentId] = removeItemIfExists(replies, { id: payload.commentId });

        const comments = [...state.video.comments];
        const parrentComment = comments.find((c) => c.id === payload.parentId);
        if (parrentComment && 'repliesCount' in parrentComment) {
          parrentComment.repliesCount = parrentComment.repliesCount ? parrentComment.repliesCount - 1 : 0;
          state.video.comments = replaceItemIfExists(comments, { id: payload.parentId }, parrentComment);
        }
      } else {
        const comments = [...state.video.comments];
        state.video.comments = removeItemIfExists(comments, { id: payload.commentId });
      }
    } else {
      const comments = [...state.video.comments];
      state.video.comments = replaceItemIfExists(comments, { id: payload.id }, payload);
    }
  });

  builder.addCase(updateComment.fulfilled, (state, { payload }) => {
    if (!state.video || state.video.comments.length === 0) {
      return state;
    }
    if (payload.parentId && payload.parentId in state.replies.data) {
      const replies = [...state.replies.data[payload.parentId]];
      state.replies.data[payload.parentId] = replaceItemIfExists(replies, { id: payload.id }, payload);
    } else {
      const comments = [...state.video.comments];
      state.video.comments = replaceItemIfExists(comments, { id: payload.id }, payload);
    }
  });

  builder.addCase(resetVideoPage, (state) => {
    state.video = null;
    state.replies.dataStatus = DataStatus.IDLE;
    state.replies.data = {};
    state.recommendedVideos.currentPage = 1;
    state.recommendedVideos.total = 0;
    state.recommendedVideos.videos = [];
  });
});

export { reducer };
