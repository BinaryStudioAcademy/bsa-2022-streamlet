import { createEntityAdapter, createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus, ErrorMessage } from 'common/enums/enums';
import { ChannelInfoResponseDto, ChannelVideoPreviewsPageDto, RootState } from 'common/types/types';
import { ChannelProfileUpdateResponseDto } from 'shared/build';
import { channelSubscribe } from 'store/subscriptions/actions';
import {
  loadChannel,
  loadMyChannelInfo,
  unloadChannelInfo,
  updateChannelAvatar,
  updateChannelBanner,
  updateChannelInfo,
  updateChannelSubscriptionCount,
} from './actions';

type ChannelInfo = Omit<ChannelInfoResponseDto, 'initialVideosPage'>;
type ChannelVideo = ChannelVideoPreviewsPageDto['list'][number];

interface InitialState {
  channelSettings: {
    data: ChannelProfileUpdateResponseDto | null;
    dataStatus: DataStatus;
    error: string | undefined;
  };
  currentChannel: {
    data: ChannelInfo | null;
    dataStatus: DataStatus;
    error: string | undefined;
    subscription: {
      dataStatus: DataStatus;
      error: string | undefined;
    };
  };
  currentChannelVideos: {
    data: ReturnType<typeof channelVideosAdapter.getInitialState>;
    dataStatus: DataStatus;
    error: string | undefined;
  };
}

const channelVideosAdapter = createEntityAdapter<ChannelVideo>({
  selectId: (channelVideo) => channelVideo.id,
  sortComparer: (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
});

const initialState: InitialState = {
  channelSettings: {
    data: null,
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
  currentChannel: {
    data: null,
    dataStatus: DataStatus.IDLE,
    error: undefined,
    subscription: {
      dataStatus: DataStatus.IDLE,
      error: undefined,
    },
  },
  currentChannelVideos: { data: channelVideosAdapter.getInitialState(), dataStatus: DataStatus.IDLE, error: undefined },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadChannel.pending, (state) => {
    state.currentChannel.dataStatus = DataStatus.PENDING;
    state.currentChannelVideos.dataStatus = DataStatus.PENDING;

    // be sure to reset state, so that no stale data is displayed
    state.currentChannel.error = undefined;
    state.currentChannel.data = null;
    state.currentChannelVideos = {
      data: channelVideosAdapter.getInitialState(),
      dataStatus: DataStatus.IDLE,
      error: undefined,
    };
  });

  builder.addCase(loadChannel.rejected, (state, { error }) => {
    state.currentChannel.dataStatus = DataStatus.REJECTED;
    state.currentChannelVideos.dataStatus = DataStatus.REJECTED;
    state.currentChannel.error = error.message || ErrorMessage.DEFAULT;
  });

  builder.addCase(loadChannel.fulfilled, (state, { payload }) => {
    state.currentChannel.dataStatus = DataStatus.FULFILLED;
    state.currentChannelVideos.dataStatus = DataStatus.FULFILLED;
    const { initialVideosPage, ...channelData } = payload;
    state.currentChannel.data = channelData;
    channelVideosAdapter.setAll(state.currentChannelVideos.data, initialVideosPage.list);
  });

  builder.addCase(loadMyChannelInfo.fulfilled, (state, { payload }) => {
    state.channelSettings.dataStatus = DataStatus.FULFILLED;
    state.channelSettings.data = payload;
    state.channelSettings.error = undefined;
  });
  builder.addCase(loadMyChannelInfo.rejected, (state, { error }) => {
    state.channelSettings.dataStatus = DataStatus.REJECTED;
    state.channelSettings.data = null;
    state.channelSettings.error = error.message || ErrorMessage.DEFAULT;
  });

  builder.addCase(unloadChannelInfo, (state) => {
    state.channelSettings.dataStatus = DataStatus.IDLE;
    state.channelSettings.data = null;
    state.channelSettings.error = undefined;
  });

  builder.addCase(channelSubscribe.fulfilled, (state, { payload }) => {
    if (state.currentChannel.data) {
      state.currentChannel.data.isCurrentUserSubscriber = payload.isSubscribed;
    }
    state.currentChannel.subscription.dataStatus = DataStatus.FULFILLED;
    state.currentChannel.subscription.error = undefined;
  });

  builder.addCase(updateChannelSubscriptionCount, (state, { payload }) => {
    if (!state.currentChannel.data) {
      return state;
    }
    state.currentChannel.data.subscribersCount = payload;
  });

  builder.addMatcher(
    isAnyOf(updateChannelInfo.fulfilled, updateChannelAvatar.fulfilled, updateChannelBanner.fulfilled),
    (state, { payload }) => {
      state.channelSettings.dataStatus = DataStatus.FULFILLED;
      state.channelSettings.data = payload;
      state.channelSettings.error = undefined;
    },
  );

  builder.addMatcher(
    isAnyOf(updateChannelInfo.pending, updateChannelAvatar.pending, updateChannelBanner.pending),
    (state) => {
      state.channelSettings.dataStatus = DataStatus.PENDING;
      state.channelSettings.error = undefined;
    },
  );

  builder.addMatcher(
    isAnyOf(updateChannelInfo.rejected, updateChannelAvatar.rejected, updateChannelBanner.rejected),
    (state, { error }) => {
      state.channelSettings.dataStatus = DataStatus.REJECTED;
      state.channelSettings.data = null;
      state.channelSettings.error = error.message || ErrorMessage.DEFAULT;
    },
  );
});

export const { selectById: selectChannelVideoById } = channelVideosAdapter.getSelectors<RootState>(
  (state) => state.channel.currentChannelVideos.data,
);

export { reducer };
