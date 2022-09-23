import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { UserBaseResponseDto } from 'common/types/types';
import { getRejectedErrorData } from 'helpers/redux/get-rejected-error-data';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { StreamPermission, UserStreamPermissionResponseDto } from 'shared/build';
import {
  signOut,
  refreshTokens,
  signIn,
  signUp,
  loadCurrentUser,
  getUserStreamPermission,
  updateUserStreamPermission,
  setPathForBackToStreamVideo,
} from './actions';

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  errorCode: string | undefined;
  user: UserBaseResponseDto | null;
  streamPermission: UserStreamPermissionResponseDto;
  pathForBackToStreamVideo: null | string;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
  error: undefined,
  errorCode: undefined,
  streamPermission: { streamPermission: StreamPermission.DECLINED },
  pathForBackToStreamVideo: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signIn.rejected, (state, { error, payload }) => {
    state.dataStatus = DataStatus.REJECTED;

    const { errorCode, message } = getRejectedErrorData(error, payload);
    state.error = message;
    state.errorCode = errorCode;
  });
  builder.addCase(loadCurrentUser.fulfilled, (state, { payload }) => {
    state.user = payload.user;
  });
  builder.addCase(signIn.fulfilled, (state, { payload }) => {
    state.user = payload;
  });
  builder.addCase(getUserStreamPermission.fulfilled, (state, { payload }) => {
    state.streamPermission = payload;
  });
  builder.addCase(updateUserStreamPermission.fulfilled, (state, { payload }) => {
    state.streamPermission = payload;
  });

  builder.addCase(setPathForBackToStreamVideo, (state, { payload }) => {
    state.pathForBackToStreamVideo = payload;
  });

  builder.addMatcher(isAnyOf(signOut.rejected, signOut.fulfilled), (state) => {
    state.user = null;
  });
  builder.addMatcher(
    isAnyOf(signUp.pending, signIn.pending, refreshTokens.pending, signOut.pending, loadCurrentUser.pending),
    (state) => {
      state.dataStatus = DataStatus.PENDING;
      state.error = undefined;
      state.errorCode = undefined;
    },
  );
  builder.addMatcher(
    isAnyOf(signUp.fulfilled, signIn.fulfilled, refreshTokens.fulfilled, signOut.fulfilled, loadCurrentUser.fulfilled),
    (state) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.error = undefined;
      state.errorCode = undefined;
    },
  );
  builder.addMatcher(
    isAnyOf(signUp.rejected, refreshTokens.rejected, signOut.rejected, loadCurrentUser.rejected),
    (state, { error }) => {
      state.dataStatus = DataStatus.REJECTED;

      state.error = error.message;
    },
  );
});

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export { persistedReducer as reducer };
