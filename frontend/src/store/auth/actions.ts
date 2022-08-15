import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  UserSignUpRequestDto,
  AsyncThunkConfig,
  UserSignInRequestDto,
  RefreshTokenRequestDto,
  UserBaseResponseDto,
  RefreshTokenResponseDto,
} from 'common/types/types';
import { removeAccessToken, removeRefreshToken, saveAccessToken, saveRefreshToken } from 'helpers/helpers';
import { ActionType } from './common';

const signUp = createAsyncThunk<UserBaseResponseDto, UserSignUpRequestDto, AsyncThunkConfig>(
  ActionType.SIGN_UP,
  async (registerPayload, { extra }) => {
    const { authApi } = extra;

    const { tokens, user } = await authApi.signUp(registerPayload);
    saveAccessToken(tokens.accessToken);
    saveRefreshToken(tokens.refreshToken);
    return user;
  },
);

const signIn = createAsyncThunk<UserBaseResponseDto, UserSignInRequestDto, AsyncThunkConfig>(
  ActionType.SIGN_IN,
  async (signinPayload, { extra }) => {
    const { authApi } = extra;

    const { tokens, user } = await authApi.signIn(signinPayload);
    saveAccessToken(tokens.accessToken);
    saveRefreshToken(tokens.refreshToken);
    return user;
  },
);

const refreshTokens = createAsyncThunk<RefreshTokenResponseDto, RefreshTokenRequestDto, AsyncThunkConfig>(
  ActionType.REFRESH_TOKENS,
  async (refreshPayload, { extra }) => {
    const { authApi } = extra;

    const newTokens = await authApi.refreshTokens(refreshPayload);
    saveAccessToken(newTokens.tokens.accessToken);
    saveRefreshToken(newTokens.tokens.refreshToken);
    return newTokens;
  },
);

const logout = createAsyncThunk(ActionType.LOGOUT, () => {
  removeAccessToken();
  removeRefreshToken();
});

export { signUp, signIn, refreshTokens, logout };
