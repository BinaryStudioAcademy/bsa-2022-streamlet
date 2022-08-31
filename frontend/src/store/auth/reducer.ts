import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { UserBaseResponseDto } from 'common/types/types';
import { getRejectedErrorData } from 'helpers/redux/get-rejected-error-data';
import { signOut, refreshTokens, signIn, signUp, loadCurrentUser } from './actions';

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  errorCode: string | undefined;
  user: UserBaseResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
  error: undefined,
  errorCode: undefined,
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

export { reducer };
