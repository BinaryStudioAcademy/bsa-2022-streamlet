import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { type ChannelBaseResponse } from 'common/types/types';
import { getChannel } from './action';

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  channel: ChannelBaseResponse | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: undefined,
  channel: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getChannel.fulfilled, (state, { payload }) => {
    state.channel = payload;
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(getChannel.pending, (state) => {
    state.error = undefined;
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getChannel.rejected, (state, { error }) => {
    state.dataStatus = DataStatus.REJECTED;
    state.error = error.message;
  });
});

export { reducer };
