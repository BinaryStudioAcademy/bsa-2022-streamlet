import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  AsyncThunkConfig,
  UserSignInResponseDto,
  UserSignInRequestDto,
  RefreshTokenRequestDto,
  TokenPair,
} from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<UserSignUpResponseDto, UserSignUpRequestDto, AsyncThunkConfig>(
  ActionType.SIGN_UP,
  async (registerPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.signUp(registerPayload);
  },
);

const signIn = createAsyncThunk<UserSignInResponseDto, UserSignInRequestDto, AsyncThunkConfig>(
  ActionType.SIGN_IN,
  async (signinPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.signIn(signinPayload);
  },
);

const refreshTokens = createAsyncThunk<TokenPair, RefreshTokenRequestDto, AsyncThunkConfig>(
  ActionType.REFRESH_TOKENS,
  async (refreshPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.refreshTokens(refreshPayload);
  },
);

export { signUp, signIn, refreshTokens };
