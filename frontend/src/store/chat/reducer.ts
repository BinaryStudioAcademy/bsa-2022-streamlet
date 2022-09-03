import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus, ErrorMessage } from 'common/enums/enums';
import { ChatInfoResponseDto, ChatMessageResponseDto } from 'common/types/types';

import {
  loadChat,
  closeChat,
  appendMessage,
  sendMessage,
  updateParticipants,
  removeParticipants,
  updateChatStatus,
} from './actions';

type State = {
  currentChat: {
    id: ChatInfoResponseDto['id'];
    initialMessages: ChatInfoResponseDto['initialMessages'];
    messages: ChatInfoResponseDto['initialMessages'];
    participants: string[];
    isChatEnabled: ChatInfoResponseDto['isChatEnabled'];
    dataStatus: DataStatus;
    error: string | undefined;
  };
  status: boolean | undefined;
};

const initialState: State = {
  currentChat: {
    id: '',
    initialMessages: {
      list: [] as ChatMessageResponseDto[],
      total: 0,
    },
    messages: {
      list: [] as ChatMessageResponseDto[],
      total: 0,
    },
    participants: [] as string[],
    isChatEnabled: true,
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
  status: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadChat.rejected, (state) => {
    state.currentChat.isChatEnabled = false;
  });

  builder.addCase(loadChat.pending, (state) => {
    state.currentChat.dataStatus = DataStatus.PENDING;
    state.currentChat = initialState.currentChat;
  });

  builder.addCase(loadChat.fulfilled, (state, { payload }) => {
    state.currentChat.id = payload.id;
    state.currentChat.initialMessages = payload.initialMessages;
    state.currentChat.isChatEnabled = payload.isChatEnabled;
  });

  builder.addCase(updateChatStatus, (state: State, { payload }) => {
    state.status = payload;
  });

  builder.addCase(updateParticipants, (state: State, { payload }) => {
    state.currentChat.participants = payload;
  });

  builder.addCase(removeParticipants, (state: State) => {
    state.currentChat.participants = initialState.currentChat.participants;
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
