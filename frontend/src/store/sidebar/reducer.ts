import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { DataSubscription } from 'shared/build';
import { loadCurrentUser } from 'store/auth/actions';
import { channelSubscribeToggle } from 'store/channel/actions';

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  subscriptions: DataSubscription | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: undefined,
  subscriptions: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadCurrentUser.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.error = undefined;
    state.subscriptions = payload.subscriptions;
  });
  builder.addCase(channelSubscribeToggle.fulfilled, (state, { payload }) => {
    if (payload.isSubscribed) {
      // TODO:
    }
  });
});

export { reducer };
