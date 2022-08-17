import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationFilter, NotificationListResponseDto } from 'common/types/notifications/notifications';
import { AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const loadNotifications = createAsyncThunk<NotificationListResponseDto, NotificationFilter, AsyncThunkConfig>(
  ActionType.GET_ALL,
  async (filter, { extra }) => {
    const { notificationApi } = extra;

    return await notificationApi.getAll(filter);
  },
);

export { loadNotifications };
