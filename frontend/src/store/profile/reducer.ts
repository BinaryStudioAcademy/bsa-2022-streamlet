import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { uploadAvatar, updateProfile } from './action';

type State = {
  dataStatus: DataStatus;
  profileLoadDataStats: DataStatus;
  error: string | undefined;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  profileLoadDataStats: DataStatus.IDLE,
  error: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(uploadAvatar.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(uploadAvatar.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(uploadAvatar.rejected, (state, { error }) => {
    state.dataStatus = DataStatus.REJECTED;
    state.error = error.message;
  });
  builder.addCase(updateProfile.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateProfile.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(updateProfile.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
