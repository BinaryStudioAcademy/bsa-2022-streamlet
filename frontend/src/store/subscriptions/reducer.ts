import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { RootState } from 'common/types/types';
import { loadCurrentUser } from 'store/auth/actions';
import { channelSubscribe } from './actions';

const subscriptionsAdapter = createEntityAdapter<{
  id: string;
  title: string;
  channelAvatar: string;
}>({
  selectId: (sub) => sub.id,
});

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  subscriptionsData: {
    subscriptionsList: ReturnType<typeof subscriptionsAdapter.getInitialState>;
    total: number;
  };
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: undefined,
  subscriptionsData: {
    total: 0,
    subscriptionsList: subscriptionsAdapter.getInitialState(),
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadCurrentUser.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.error = undefined;
    subscriptionsAdapter.setAll(
      state.subscriptionsData.subscriptionsList,
      payload.subscriptions.list.map((item) => ({
        channelAvatar: item.channel.avatar,
        id: item.channel.id,
        title: item.channel.name,
      })),
    );
    state.subscriptionsData.total = payload.subscriptions.total;
  });
  builder.addCase(channelSubscribe.fulfilled, (state, { payload }) => {
    if (payload.isSubscribed) {
      subscriptionsAdapter.upsertOne(state.subscriptionsData.subscriptionsList, payload.channel);
      state.subscriptionsData.total++;
    } else {
      subscriptionsAdapter.removeOne(state.subscriptionsData.subscriptionsList, payload.channel.id);
      state.subscriptionsData.total--;
    }
  });
});

export const { selectAll: selectAllSidebarSubscriptions } = subscriptionsAdapter.getSelectors<RootState>(
  (state) => state.subscriptions.subscriptionsData.subscriptionsList,
);
export { reducer };
