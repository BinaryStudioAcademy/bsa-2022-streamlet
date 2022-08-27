import { createReducer } from '@reduxjs/toolkit';
import { DataStatus, ErrorMessage } from 'common/enums/enums';
import { ChatInfoResponseDto } from 'shared/build';

import { loadChat, closeChat } from './actions';

type State = {
  currentChat: {
    data: ChatInfoResponseDto | null;
    dataStatus: DataStatus;
    error: string | undefined;
  };
};

const initialState: State = {
  currentChat: {
    data: null,
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadChat.pending, (state) => {
    state.currentChat.dataStatus = DataStatus.PENDING;
    state.currentChat = initialState.currentChat;
  });

  builder.addCase(loadChat.rejected, (state, { error }) => {
    state.currentChat.dataStatus = DataStatus.REJECTED;
    state.currentChat.error = error.message || ErrorMessage.DEFAULT;
  });

  builder.addCase(loadChat.fulfilled, (state, { payload }) => {
    state.currentChat.dataStatus = DataStatus.FULFILLED;
    state.currentChat.data = payload;
  });

  builder.addCase(closeChat, (state: State) => {
    state.currentChat = initialState.currentChat;
  });
});

export { reducer };
