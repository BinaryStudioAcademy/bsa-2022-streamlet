import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { uploadAvatar, updateProfile, getProfileByUserId } from './action';
import { ProfileUpdateResponseDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  profileData: ProfileUpdateResponseDto | null;
  error: string | undefined;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  profileData: null,
  error: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(updateProfile.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
    state.error = undefined;
  });
  builder.addMatcher(isAnyOf(getProfileByUserId.pending, uploadAvatar.pending), (state) => {
    state.dataStatus = DataStatus.PENDING;
    state.error = undefined;
    state.profileData = null;
  });
  builder.addMatcher(
    isAnyOf(getProfileByUserId.fulfilled, updateProfile.fulfilled, uploadAvatar.fulfilled),
    (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.error = undefined;
      state.profileData = payload;
    },
  );
  builder.addMatcher(
    isAnyOf(getProfileByUserId.rejected, updateProfile.rejected, uploadAvatar.rejected),
    (state, { error }) => {
      const { message: errorMessage } = error;
      state.dataStatus = DataStatus.REJECTED;
      state.error = errorMessage;
    },
  );
});

export { reducer };
