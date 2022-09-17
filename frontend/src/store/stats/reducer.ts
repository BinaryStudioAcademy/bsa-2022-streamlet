import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { CreateChannelStatRequestDto } from 'shared/build';
import { sendChannelStat } from './actions';

type State = {
  channel: {
    stats: CreateChannelStatRequestDto['stats'] | null;
    dataStatus: DataStatus;
    error: string | undefined;
  };
};

const initialState: State = {
  channel: {
    stats: null,
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(sendChannelStat.pending, (state) => {
    state.channel.dataStatus = DataStatus.PENDING;
    state.channel.error = initialState.channel.error;
    state.channel.stats = initialState.channel.stats;
  });
  builder.addCase(sendChannelStat.rejected, (state, { error }) => {
    state.channel.dataStatus = DataStatus.REJECTED;
    state.channel.error = error.message;
  });
  builder.addCase(sendChannelStat.fulfilled, (state) => {
    state.channel.dataStatus = DataStatus.FULFILLED;
  });
});

export { reducer };
