import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  CreateCommentReactionRequestDto,
  CreateCommentReactionResponseDto,
  AddVideoViewResponseDto,
} from 'common/types/types';
import { getDeviceCategoryByNavigator } from 'helpers/helpers';
import {
  VideoExpandedResponseDto,
  ResponseRepliesForComment,
  BaseReplyRequestDto,
  Comment,
  DeleteCommentResponseDto,
  DataVideo,
  StreamStatus,
  AddVideoViewRequestDto,
} from 'shared/build';
import { ActionType } from './common';

const getVideo = createAsyncThunk<VideoExpandedResponseDto, string, AsyncThunkConfig>(
  ActionType.GET_VIDEO,
  async (videoId: string, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.getSingleVideo(videoId);
  },
);

const getVideoWithoutRecommended = createAsyncThunk<VideoExpandedResponseDto, string, AsyncThunkConfig>(
  ActionType.GET_VIDEO_WITHOUT_RECOMMENDED,
  async (videoId: string, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.getSingleVideo(videoId);
  },
);

const loadRecommendedVideos = createAsyncThunk<DataVideo, string, AsyncThunkConfig>(
  ActionType.LOAD_RECOMMENDED_VIDEOS,
  // you might think that it's possible to get video id without passing it into parameters
  // by looking into state, but this info is not there until the video is loaded, and we want
  // to start loading recommendations even before the video info has been received from the server
  async (videoId: string, { extra, getState }) => {
    const { videoApi } = extra;
    const { numbersOfGetVideos, currentPage } = getState().videoPage.recommendedVideos;

    const pagination = {
      skip: (currentPage - 1) * numbersOfGetVideos,
      take: numbersOfGetVideos,
    };

    const videos = await videoApi.getSimilarVideos(videoId, pagination);
    return videos;
  },
);

const setNumberOfLoadingVideo = createAction<number>(ActionType.SET_NUMBER_OF_LOADING_VIDEO);

const addVideoComment = createAsyncThunk<VideoCommentResponseDto, VideoCommentRequestDto, AsyncThunkConfig>(
  ActionType.COMMENT,
  async (payload: VideoCommentRequestDto, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.comment(payload);
  },
);

const addVideoView = createAsyncThunk<AddVideoViewResponseDto | null | true, void, AsyncThunkConfig>(
  ActionType.ADD_VIEW,
  async (payload, { extra, getState }) => {
    const { videoApi } = extra;
    const state = getState();
    const currentVideo = state.videoPage.video;
    const isViewed = state.videoPage.videoView.isViewed;
    const subs = state.subscriptions.subscriptionsData.subscriptionsList.ids;

    if (!currentVideo) {
      return null;
    }

    const additionalDataForStats = {
      watchTime: 0,
      device: getDeviceCategoryByNavigator(window.navigator),
      language: window.navigator.language,
      isLive: currentVideo.status === StreamStatus.LIVE,
      durationStamp: 0,
      wasSubscribed: subs.includes(currentVideo.channel.id),
      source: window.location.pathname.split('/')[1],
      createdAt: new Date().toISOString(),
    } as AddVideoViewRequestDto['data'];

    if (isViewed) {
      return true;
    }
    return await videoApi.addVideoView({ videoId: currentVideo.id, data: additionalDataForStats });
  },
);

const addVideoCommentReply = createAsyncThunk<ResponseRepliesForComment, BaseReplyRequestDto, AsyncThunkConfig>(
  ActionType.ADD_REPLY_FOR_COMMENT,
  async (payload: BaseReplyRequestDto, { extra }) => {
    const { videoApi } = extra;

    const data = await videoApi.addVideoCommentReply(payload);

    return {
      data,
      commentId: payload.parentId,
    };
  },
);

const videoReact = createAsyncThunk<
  CreateReactionResponseDto,
  CreateReactionRequestDto & { videoId: string },
  AsyncThunkConfig
>(ActionType.REACT, async (payload, { extra }) => {
  const { videoApi } = extra;
  return await videoApi.react(payload);
});

const commentReact = createAsyncThunk<
  CreateCommentReactionResponseDto,
  CreateCommentReactionRequestDto & { commentId: string },
  AsyncThunkConfig
>(ActionType.COMMENT_REACT, async (payload, { extra }) => {
  const { videoApi } = extra;
  return await videoApi.commentReact(payload);
});

const updateLiveViews = createAction<number>(ActionType.UPDATE_LIVE_VIEWS);

const getRepliesForComment = createAsyncThunk<ResponseRepliesForComment, string, AsyncThunkConfig>(
  ActionType.GET_REPLIES_FOR_COMMENT,
  async (commentId: string, { extra }) => {
    const { videoApi } = extra;

    const data = await videoApi.getRepliesForComment(commentId);

    return {
      data,
      commentId,
    };
  },
);

const updateComment = createAsyncThunk<
  Comment,
  { commentId: string; comment: VideoCommentRequestDto },
  AsyncThunkConfig
>(ActionType.UPDATE_COMMENT, async (commentPayload, { extra }) => {
  const { commentApi } = extra;

  return await commentApi.updateComment(commentPayload);
});

const deleteComment = createAsyncThunk<Comment | DeleteCommentResponseDto, string, AsyncThunkConfig>(
  ActionType.DELETE_COMMENT,
  async (commentId: string, { extra }) => {
    const { commentApi } = extra;

    return await commentApi.deleteComment(commentId);
  },
);

const resetVideoPage = createAction(ActionType.RESET_VIDEO_PAGE);

export {
  getVideo,
  videoReact,
  addVideoComment,
  updateLiveViews,
  commentReact,
  getRepliesForComment,
  addVideoCommentReply,
  resetVideoPage,
  addVideoView,
  loadRecommendedVideos,
  deleteComment,
  updateComment,
  setNumberOfLoadingVideo,
  getVideoWithoutRecommended,
};
