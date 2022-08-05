import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserSignUpRequestDto, UserSignUpResponseDto, AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<UserSignUpResponseDto, UserSignUpRequestDto, AsyncThunkConfig>(
  ActionType.SIGN_UP,
  async (registerPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.signUp(registerPayload);
  },
);

export { signUp };
