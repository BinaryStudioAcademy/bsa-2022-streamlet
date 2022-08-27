import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, ChatInfoRequestDto, ChatInfoResponseDto } from 'common/types/types';

import { ActionType } from './common';

const loadChat = createAsyncThunk<ChatInfoResponseDto, ChatInfoRequestDto, AsyncThunkConfig>(
  ActionType.LOAD_CHAT,
  async ({ id }, { extra: { chatApi } }): Promise<ChatInfoResponseDto> => {
    return chatApi.getChatInfo({ id });
  },
);

const closeChat = createAction(ActionType.CLOSE_CHAT);

export { loadChat, closeChat };
