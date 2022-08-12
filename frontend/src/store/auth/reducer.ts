import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { refreshTokens, signIn, signUp } from './actions';

type State = {
  dataStatus: DataStatus;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addMatcher(isAnyOf(signUp.pending, signIn.pending, refreshTokens.pending), (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addMatcher(isAnyOf(signUp.fulfilled, signIn.fulfilled, refreshTokens.fulfilled), (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addMatcher(isAnyOf(signUp.rejected, signIn.rejected, refreshTokens.rejected), (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
