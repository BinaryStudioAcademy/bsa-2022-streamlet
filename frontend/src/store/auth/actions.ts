import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpCode } from 'common/enums/enums';
import { AsyncThunkConfigHttpError } from 'common/types/app/app';

import {
  UserSignUpRequestDto,
  AsyncThunkConfig,
  UserSignInRequestDto,
  RefreshTokenRequestDto,
  UserBaseResponseDto,
  RefreshTokenResponseDto,
  GoogleResponseDto,
  GoogleRequestDto,
  GetCurrentUserResponseDto,
} from 'common/types/types';
import { HttpError } from 'exceptions/exceptions';
import { serializeHttpError } from 'helpers/http/http';
import { authApi, tokensStorageService } from 'services/services';
import { UserStreamPermissionResponseDto } from 'shared/build';
import { ActionType } from './common';

const signUp = createAsyncThunk<void, UserSignUpRequestDto, AsyncThunkConfig>(
  ActionType.SIGN_UP,
  async (registerPayload, { extra }) => {
    const { authApi } = extra;

    await authApi.signUp(registerPayload);
  },
);

const signIn = createAsyncThunk<UserBaseResponseDto, UserSignInRequestDto, AsyncThunkConfigHttpError>(
  ActionType.SIGN_IN,
  async (signinPayload, { extra, rejectWithValue }) => {
    const { authApi } = extra;
    try {
      const { tokens, user } = await authApi.signIn(signinPayload);
      tokensStorageService.saveTokens(tokens);
      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        return rejectWithValue(serializeHttpError(error));
      }
      throw error;
    }
  },
);

let refreshPromise: Promise<RefreshTokenResponseDto> | null;
const refreshTokens = createAsyncThunk<RefreshTokenResponseDto, RefreshTokenRequestDto, AsyncThunkConfig>(
  ActionType.REFRESH_TOKENS,
  async (refreshPayload, { extra }) => {
    const { authApi } = extra;
    let newTokens;
    if (refreshPromise) {
      newTokens = await refreshPromise;
    } else {
      refreshPromise = authApi.refreshTokens(refreshPayload);
      newTokens = await refreshPromise;
      refreshPromise = null;
    }
    tokensStorageService.saveTokens(newTokens.tokens);
    return newTokens;
  },
);

// in some cases there is a need only to sign out on client, while usually it's also needed to signOut on backend
const signOut = createAsyncThunk<void, { hitApi: boolean } | undefined>(
  ActionType.SIGN_OUT,
  async ({ hitApi } = { hitApi: true }) => {
    try {
      if (hitApi) {
        await authApi.signOut();
      }
    } finally {
      tokensStorageService.clearTokens();
    }
  },
);

const loadCurrentUser = createAsyncThunk<GetCurrentUserResponseDto, void, AsyncThunkConfig>(
  ActionType.LOAD_CURRENT_USER,
  async (_request, { dispatch, extra: { authApi } }) => {
    try {
      const data = await authApi.getCurrentUser();
      return data;
    } catch (err) {
      const isHttpError = err instanceof HttpError;

      if (isHttpError && err.status === HttpCode.UNAUTHORIZED) {
        await dispatch(signOut({ hitApi: false }));
      }

      throw err;
    }
  },
);

const signInGoogle = createAsyncThunk<GoogleResponseDto, void, AsyncThunkConfig>(
  ActionType.SIGN_IN_GOOGLE,
  async (_request, { extra }) => {
    const { authApi } = extra;

    const authorizationUrl = await authApi.signInGoogle();
    return authorizationUrl;
  },
);

const googleAuthorization = createAsyncThunk<UserBaseResponseDto, GoogleRequestDto, AsyncThunkConfig>(
  ActionType.GOOGLE_ATHORIZATION,
  async (registerPayload, { extra }) => {
    const { authApi } = extra;

    const { tokens, user } = await authApi.googleAuthorization(registerPayload);
    tokensStorageService.saveTokens(tokens);
    return user;
  },
);

const getUserStreamPermission = createAsyncThunk<UserStreamPermissionResponseDto, void, AsyncThunkConfig>(
  ActionType.STREAM_PERMISSION,
  async (_, { extra }) => {
    const { authApi } = extra;

    return authApi.getUserStreamPermission();
  },
);

const updateUserStreamPermission = createAsyncThunk<UserStreamPermissionResponseDto, void, AsyncThunkConfig>(
  ActionType.STREAM_PERMISSION_UPDATE,
  async (_, { extra }) => {
    const { authApi } = extra;

    return authApi.updateUserStreamPermission();
  },
);

const setPathForBackToStreamVideo = createAction<null | string>(ActionType.SET_PATH_FOR_BACK_TO_STREAM_VIDEO);

export {
  signUp,
  signIn,
  refreshTokens,
  signOut,
  loadCurrentUser,
  signInGoogle,
  googleAuthorization,
  getUserStreamPermission,
  updateUserStreamPermission,
  setPathForBackToStreamVideo,
};
