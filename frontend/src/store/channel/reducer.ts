import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { DataStatus, ErrorMessage } from 'common/enums/enums';
import { ChannelInfoResponseDto, ChannelVideoPreviewsPageDto, RootState } from 'common/types/types';
import { channelSubscribeToggle, loadChannel } from './actions';

type CurrentChannelInfo = Omit<ChannelInfoResponseDto, 'initialVideosPage'>;
type ChannelVideo = ChannelVideoPreviewsPageDto['list'][number];

interface InitialState {
  currentChannel: {
    data: CurrentChannelInfo | null;
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
    state.currentChannel.error = error.message || ErrorMessage.DEFAULT;
  });

  builder.addCase(loadChannel.fulfilled, (state, { payload }) => {
    state.currentChannel.dataStatus = DataStatus.FULFILLED;
    const { initialVideosPage, ...channelData } = payload;
    state.currentChannel.data = channelData;
    channelVideosAdapter.setAll(state.currentChannelVideos.data, initialVideosPage.list);
  });
  builder.addCase(channelSubscribeToggle.fulfilled, (state, { payload }) => {
    if (state.currentChannel.data) {
      state.currentChannel.data.isCurrentUserSubscriber = payload.isSubscribed;
    }
    state.currentChannel.subscription.dataStatus = DataStatus.FULFILLED;
    state.currentChannel.subscription.error = undefined;
  });
});

export const { selectById: selectChannelVideoById } = channelVideosAdapter.getSelectors<RootState>(
  (state) => state.channel.currentChannelVideos.data,
);

export { reducer };
