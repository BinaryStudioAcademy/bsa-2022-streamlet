import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { TokenPair, UserBaseResponseDto } from 'common/types/types';
import { logout, refreshTokens, signIn, signUp } from './actions';

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  user: UserBaseResponseDto | null;
  tokens: TokenPair | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
  tokens: null,
  error: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(logout, (state) => {
    state.tokens = null;
    state.user = null;
  });
  builder.addMatcher(isAnyOf(signUp.fulfilled, signIn.fulfilled), (state, { payload }) => {
    state.user = payload.user;
  });
  builder.addMatcher(isAnyOf(signUp.pending, signIn.pending, refreshTokens.pending), (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addMatcher(isAnyOf(signUp.fulfilled, signIn.fulfilled, refreshTokens.fulfilled), (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.tokens = payload.tokens;
  });
  builder.addMatcher(isAnyOf(signUp.rejected, signIn.rejected, refreshTokens.rejected), (state, { error }) => {
    state.dataStatus = DataStatus.REJECTED;
    state.error = error.message;
  });
});

export { reducer };
