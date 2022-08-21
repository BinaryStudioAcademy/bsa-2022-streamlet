import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpCode } from 'common/enums/enums';

import {
  UserSignUpRequestDto,
  AsyncThunkConfig,
  UserSignInRequestDto,
  RefreshTokenRequestDto,
  UserBaseResponseDto,
  RefreshTokenResponseDto,
} from 'common/types/types';
import { HttpError } from 'exceptions/exceptions';
import { authApi, tokensStorageService } from 'services/services';
import { ActionType } from './common';

const signUp = createAsyncThunk<void, UserSignUpRequestDto, AsyncThunkConfig>(
  ActionType.SIGN_UP,
  async (registerPayload, { extra }) => {
    const { authApi } = extra;

    await authApi.signUp(registerPayload);
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
    try {
      if (hitApi) {
        await authApi.logout();
      }
    } finally {
      tokensStorageService.clearTokens();
    }
  },
);

const loadCurrentUser = createAsyncThunk<UserBaseResponseDto, void, AsyncThunkConfig>(
  ActionType.SIGN_IN,
  async (_request, { dispatch, extra: { authApi } }) => {
    try {
      const { tokens, user } = await authApi.getCurrentUser();
      tokensStorageService.saveTokens(tokens);
      return user;
    } catch (err) {
      const isHttpError = err instanceof HttpError;

      if (isHttpError && err.status === HttpCode.UNAUTHORIZED) {
        await dispatch(logout({ hitApi: false }));
      }

      throw err;
    }
  },
);

export { signUp, signIn, refreshTokens, logout, loadCurrentUser };
