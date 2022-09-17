import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { CreateChannelStatRequestDto } from 'shared/build';

import { ActionType } from './common';

const sendChannelStat = createAsyncThunk<boolean, { id: string } & CreateChannelStatRequestDto, AsyncThunkConfig>(
  ActionType.SEND_CHANNEL_STAT,
  async (channelStat, { extra: { statsApi } }) => {
    return statsApi.sendChannelStatEvent(channelStat);
  },
);

export { sendChannelStat };
