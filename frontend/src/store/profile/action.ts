import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserUploadRequestDto, AsyncThunkConfig, type getProfileByUserIdRequestDto } from 'common/types/types';
import { ActionType } from './common';
import { ProfileUpdateRequestDto, ProfileUpdateResponseDto } from 'shared/build';
const uploadAvatar = createAsyncThunk<ProfileUpdateResponseDto, UserUploadRequestDto, AsyncThunkConfig>(
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

const getProfileByUserId = createAsyncThunk<ProfileUpdateResponseDto, getProfileByUserIdRequestDto, AsyncThunkConfig>(
  ActionType.GET_PROFILE_BY_USER_ID,
  async (payload, { extra }) => {
    const { profileApi } = extra;

    return profileApi.getProfileByUserId(payload);
  },
);

export { uploadAvatar, updateProfile, getProfileByUserId };
