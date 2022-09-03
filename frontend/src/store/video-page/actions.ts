import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  CreateCommentReactionRequestDto,
  CreateCommentReactionResponseDto,
} from 'common/types/types';
import { VideoExpandedResponseDto, ResponseRepliesForComment, BaseReplyRequestDto } from 'shared/build';
import { ActionType } from './common';

const getVideo = createAsyncThunk<VideoExpandedResponseDto, string, AsyncThunkConfig>(
  ActionType.GET_VIDEO,
  async (videoId: string, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.getSingleVideo(videoId);
  },
);

const addVideoComment = createAsyncThunk<VideoCommentResponseDto, VideoCommentRequestDto, AsyncThunkConfig>(
  ActionType.COMMENT,
  async (payload: VideoCommentRequestDto, { extra }) => {
    const { videoApi } = extra;

    return await videoApi.comment(payload);
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

export {
  getVideo,
  videoReact,
  addVideoComment,
  updateLiveViews,
  commentReact,
  getRepliesForComment,
  addVideoCommentReply,
};
