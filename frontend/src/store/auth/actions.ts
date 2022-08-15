import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  UserSignUpRequestDto,
  AsyncThunkConfig,
  UserSignInRequestDto,
  RefreshTokenRequestDto,
  UserBaseResponseDto,
  RefreshTokenResponseDto,
} from 'common/types/types';
import { authApi, tokensStorageService } from 'services/services';
import { ActionType } from './common';

const signUp = createAsyncThunk<UserBaseResponseDto, UserSignUpRequestDto, AsyncThunkConfig>(
  ActionType.SIGN_UP,
  async (registerPayload, { extra }) => {
    const { authApi } = extra;

    const { tokens, user } = await authApi.signUp(registerPayload);
    tokensStorageService.saveTokens(tokens);
    return user;
  },
);

const signIn = createAsyncThunk<UserBaseResponseDto, UserSignInRequestDto, AsyncThunkConfig>(
  ActionType.SIGN_IN,
  async (signinPayload, { extra }) => {
    const { authApi } = extra;

    const { tokens, user } = await authApi.signIn(signinPayload);
    tokensStorageService.saveTokens(tokens);
    return user;
  },
);

const refreshTokens = createAsyncThunk<RefreshTokenResponseDto, RefreshTokenRequestDto, AsyncThunkConfig>(
  ActionType.REFRESH_TOKENS,
  async (refreshPayload, { extra }) => {
    const { authApi } = extra;

    const newTokens = await authApi.refreshTokens(refreshPayload);
    tokensStorageService.saveTokens(newTokens.tokens);
    return newTokens;
  },
);

// in some cases there is a need only to log out on client, while usually it's also needed to logout on backend
const logout = createAsyncThunk<void, { hitApi: boolean } | undefined>(
  ActionType.LOGOUT,
  async ({ hitApi } = { hitApi: true }) => {
    if (hitApi) {
      await authApi.logout();
    }
    tokensStorageService.clearTokens();
  },
);

export { signUp, signIn, refreshTokens, logout };
