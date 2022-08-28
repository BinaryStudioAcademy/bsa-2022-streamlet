import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus, ErrorMessage } from 'common/enums/enums';
import { ChatInfoResponseDto, ChatMessageResponseDto } from 'common/types/types';

import { loadChat, closeChat, appendMessage, sendMessage } from './actions';

type State = {
  currentChat: {
    id: ChatInfoResponseDto['id'];
    messages: ChatInfoResponseDto['initialMessages'];
    dataStatus: DataStatus;
    error: string | undefined;
  };
};

const initialState: State = {
  currentChat: {
    id: '',
    messages: {
      list: [] as ChatMessageResponseDto[],
      total: 0,
    },
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadChat.pending, (state) => {
    state.currentChat.dataStatus = DataStatus.PENDING;
    state.currentChat = initialState.currentChat;
  });

  builder.addCase(loadChat.fulfilled, (state, { payload }) => {
    state.currentChat.id = payload.id;
    state.currentChat.messages = payload.initialMessages;
  });

  builder.addCase(closeChat, (state: State) => {
    state.currentChat = initialState.currentChat;
  });

  builder.addCase(appendMessage, (state: State, { payload }) => {
    state.currentChat.messages.list = [payload, ...state.currentChat.messages.list];
    state.currentChat.messages.total = state.currentChat.messages.total + 1;
  });

  builder.addMatcher(isAnyOf(loadChat.rejected, sendMessage.rejected), (state, { error }) => {
    state.currentChat.dataStatus = DataStatus.REJECTED;
    state.currentChat.error = error.message || ErrorMessage.DEFAULT;
  });

  builder.addMatcher(isAnyOf(loadChat.fulfilled, sendMessage.fulfilled), (state) => {
    state.currentChat.dataStatus = DataStatus.FULFILLED;
    state.currentChat.error = initialState.currentChat.error;
  });
});

export { reducer };
