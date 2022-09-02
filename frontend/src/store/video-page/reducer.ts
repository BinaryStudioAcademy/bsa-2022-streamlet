import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { VideoExpandedResponseDto } from 'shared/build';
import { channelSubscribe } from 'store/subscriptions/actions';
import { addVideoComment, getVideo, videoReact, updateLiveViews } from './actions';

type State = {
  dataStatus: DataStatus;
  subscription: {
    dataStatus: DataStatus;
    error: string | undefined;
  };
  error: string | undefined;
  video: VideoExpandedResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  video: null,
  error: undefined,
  subscription: {
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getVideo.fulfilled, (state, { payload }) => {
    state.video = payload;
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(getVideo.pending, (state) => {
    state.error = undefined;
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getVideo.rejected, (state, { error }) => {
    state.dataStatus = DataStatus.REJECTED;
    state.error = error.message;
  });
  builder.addCase(channelSubscribe.fulfilled, (state, { payload }) => {
    if (state.video) {
      state.video.isUserSubscribedOnChannel = payload.isSubscribed;
      state.video.channel.subscriberCount += payload.isSubscribed ? 1 : -1;
    }
    state.subscription.dataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(addVideoComment.fulfilled, (state, { payload }) => {
    if (state.video) {
      state.video.comments = payload.comments;
    }
    state.dataStatus = DataStatus.FULFILLED;
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
});

export { reducer };
