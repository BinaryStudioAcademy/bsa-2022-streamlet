import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  ChatInfoRequestDto,
  ChatInfoResponseDto,
  ChatMessageRequestDto,
  ChatMessageResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const loadChat = createAsyncThunk<ChatInfoResponseDto, ChatInfoRequestDto, AsyncThunkConfig>(
  ActionType.LOAD_CHAT,
  async ({ id }, { extra: { chatApi } }): Promise<ChatInfoResponseDto> => {
    return chatApi.getChatInfo({ id });
  },
);

const closeChat = createAction(ActionType.CLOSE_CHAT);

const appendMessage = createAction<ChatMessageResponseDto>(ActionType.APPEND_MESSAGE);

const sendMessage = createAsyncThunk<
  ChatMessageResponseDto,
  { chatId: string; message: ChatMessageRequestDto },
  AsyncThunkConfig
>(ActionType.SEND_MESSAGE, async (messagePayload, { extra: { chatApi } }): Promise<ChatMessageResponseDto> => {
  return chatApi.sendMessage(messagePayload);
});

export { loadChat, closeChat, appendMessage, sendMessage };
