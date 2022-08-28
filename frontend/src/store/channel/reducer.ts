import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { DataStatus, ErrorMessage } from 'common/enums/enums';
import { ChannelInfoResponseDto, RootState } from 'common/types/types';
import { ChannelVideoPreviewsPageDto, OwnChannelResponseDto } from 'shared/build';
import { loadChannel, loadMyChannel } from './actions';

type ChannelInfo = Omit<ChannelInfoResponseDto, 'initialVideosPage'>;
type ChannelVideo = ChannelVideoPreviewsPageDto['list'][number];

interface InitialState {
  currentChannel: {
    data: ChannelInfo | null;
    dataStatus: DataStatus;
    error: string | undefined;
  };
  currentChannelVideos: {
    data: ReturnType<typeof channelVideosAdapter.getInitialState>;
    dataStatus: DataStatus;
    error: string | undefined;
  };
  myChannel: {
    data: OwnChannelResponseDto | null;
    dataStatus: DataStatus;
    error: string | undefined;
    streamingKey: string | null;
  };
  // myChannelVideos: {
  //   data: ReturnType<typeof channelVideosAdapter.getInitialState>;
  //   dataStatus: DataStatus;
  //   error: string | undefined;
  // };
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
  },
  currentChannelVideos: { data: channelVideosAdapter.getInitialState(), dataStatus: DataStatus.IDLE, error: undefined },
  myChannel: {
    data: null,
    dataStatus: DataStatus.IDLE,
    error: undefined,
    streamingKey: null,
  },
  // myChannelVideos: { data: channelVideosAdapter.getInitialState(), dataStatus: DataStatus.IDLE, error: undefined },
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

  builder.addCase(loadMyChannel.pending, (state) => {
    state.myChannel.dataStatus = DataStatus.PENDING;
    state.myChannel.error = undefined;
  });

  builder.addCase(loadChannel.rejected, (state, { error }) => {
    state.currentChannel.dataStatus = DataStatus.REJECTED;
    state.currentChannel.error = error.message || ErrorMessage.DEFAULT;
  });

  builder.addCase(loadMyChannel.rejected, (state, { error }) => {
    state.myChannel.dataStatus = DataStatus.REJECTED;
    state.myChannel.error = error.message || ErrorMessage.DEFAULT;
  });

  builder.addCase(loadChannel.fulfilled, (state, { payload }) => {
    state.currentChannel.dataStatus = DataStatus.FULFILLED;
    const { initialVideosPage, ...channelData } = payload;
    state.currentChannel.data = channelData;
    channelVideosAdapter.setAll(state.currentChannelVideos.data, initialVideosPage.list);
  });

  builder.addCase(loadMyChannel.fulfilled, (state, { payload }) => {
    state.myChannel.dataStatus = DataStatus.FULFILLED;
    const { /* initialVideosPage, */ ...channelData } = payload;
    state.myChannel.data = channelData;
    // channelVideosAdapter.setAll(state.myChannelVideos.data, initialVideosPage.list);
  });
});

export const { selectById: selectChannelVideoById } = channelVideosAdapter.getSelectors<RootState>(
  (state) => state.channel.currentChannelVideos.data,
);

// export const { selectById: selectMyChannelVideo } = channelVideosAdapter.getSelectors<RootState>(
//   (state) => state.channel.myChannelVideos.data,
// );

export { reducer };
