import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { BaseVideoResponseDto } from 'shared/build';
import { channelSubscribe } from 'store/subscriptions/actions';
import { loadLiveVideos, loadOfflineVideos } from './actions';

type CommonVideoTabState = {
  videos: BaseVideoResponseDto[];
  dataStatus: DataStatus;
  error: string | undefined;
  areSubscriptionsStale: boolean;
};

type State = {
  liveVideos: CommonVideoTabState;
  offlineVideos: CommonVideoTabState;
};

const initialState: State = {
  liveVideos: { videos: [], error: undefined, dataStatus: DataStatus.IDLE, areSubscriptionsStale: false },
  offlineVideos: { videos: [], error: undefined, dataStatus: DataStatus.IDLE, areSubscriptionsStale: false },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadOfflineVideos.pending, (state) => {
    state.offlineVideos.areSubscriptionsStale = false;
    state.offlineVideos.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadOfflineVideos.rejected, (state, { error }) => {
    state.offlineVideos.dataStatus = DataStatus.REJECTED;
    state.offlineVideos.error = error.message;
  });
  builder.addCase(loadOfflineVideos.fulfilled, (state, { payload }) => {
    state.offlineVideos.dataStatus = DataStatus.FULFILLED;
    state.offlineVideos.videos = payload.videos;
  });

  builder.addCase(loadLiveVideos.pending, (state) => {
    state.liveVideos.areSubscriptionsStale = false;
    state.liveVideos.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadLiveVideos.rejected, (state, { error }) => {
    state.liveVideos.dataStatus = DataStatus.REJECTED;
    state.liveVideos.error = error.message;
  });
  builder.addCase(loadLiveVideos.fulfilled, (state, { payload }) => {
    state.liveVideos.dataStatus = DataStatus.FULFILLED;
    state.liveVideos.videos = payload.videos;
  });

  builder.addCase(channelSubscribe.fulfilled, (state) => {
    state.offlineVideos.areSubscriptionsStale = true;
    state.liveVideos.areSubscriptionsStale = true;
  });
});

export { reducer };
