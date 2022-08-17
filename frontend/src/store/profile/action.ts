import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserUploadRequestDto, UserUploadResponseDto, AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';
import { ProfileUpdateRequestDto, ProfileUpdateResponseDto } from 'shared/build';

const uploadAvatar = createAsyncThunk<UserUploadResponseDto, UserUploadRequestDto, AsyncThunkConfig>(
  ActionType.LOAD_AVATAR,
  async (registerPayload, { extra }) => {
    const { profileApi } = extra;

    return profileApi.uploadAvatar(registerPayload);
  },
);

const updateProfile = createAsyncThunk<ProfileUpdateResponseDto, ProfileUpdateRequestDto, AsyncThunkConfig>(
  ActionType.UPDATE_PROFILE,
  async (payload, { extra }) => {
    const { profileApi } = extra;

    return profileApi.updateProfile(payload);
  },
);

export { uploadAvatar, updateProfile };
