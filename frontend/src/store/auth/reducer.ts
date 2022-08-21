import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { UserBaseResponseDto } from 'common/types/types';
import { signOut, refreshTokens, signIn, signUp, loadCurrentUser } from './actions';

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  user: UserBaseResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
  error: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addMatcher(isAnyOf(signOut.rejected, signOut.fulfilled), (state) => {
    state.user = null;
  });
  builder.addMatcher(isAnyOf(loadCurrentUser.fulfilled, signIn.fulfilled), (state, { payload }) => {
    state.user = payload;
  });
  builder.addMatcher(
    isAnyOf(signUp.pending, signIn.pending, refreshTokens.pending, signOut.pending, loadCurrentUser.pending),
    (state) => {
      state.dataStatus = DataStatus.PENDING;
      state.error = undefined;
    },
  );
  builder.addMatcher(
    isAnyOf(signUp.fulfilled, signIn.fulfilled, refreshTokens.fulfilled, signOut.fulfilled, loadCurrentUser.fulfilled),
    (state) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.error = undefined;
    },
  );
  builder.addMatcher(
    isAnyOf(signUp.rejected, signIn.rejected, refreshTokens.rejected, signOut.rejected, loadCurrentUser.rejected),
    (state, { error }) => {
      state.dataStatus = DataStatus.REJECTED;
      state.error = error.message;
    },
  );
});

export { reducer };
