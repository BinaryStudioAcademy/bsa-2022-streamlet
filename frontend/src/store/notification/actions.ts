import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  DefaultRequestParam,
  NotificationBaseResponseDto,
  NotificationFilter,
  NotificationListResponseDto,
} from 'common/types/types';
import { ActionType } from './common';

const getNotifications = createAsyncThunk<NotificationListResponseDto, NotificationFilter, AsyncThunkConfig>(
  ActionType.GET_ALL,
  async (filter, { extra }) => {
    const { notificationApi } = extra;

    return await notificationApi.getAll(filter);
  },
);

const getNotification = createAsyncThunk<NotificationBaseResponseDto, DefaultRequestParam, AsyncThunkConfig>(
  ActionType.GET_ONE,
  async ({ id }, { extra }) => {
    const { notificationApi } = extra;

    return await notificationApi.getOne({ id });
  },
);

const readNotification = createAsyncThunk<NotificationBaseResponseDto, DefaultRequestParam, AsyncThunkConfig>(
  ActionType.READ_ONE,
  async ({ id }, { extra }) => {
    const { notificationApi } = extra;

    return await notificationApi.readOne({ id });
  },
);

const readAllNotifications = createAsyncThunk<NotificationListResponseDto, void, AsyncThunkConfig>(
  ActionType.READ_ALL,
  async (_, { extra }) => {
    const { notificationApi } = extra;

    return await notificationApi.readAll();
  },
);

export { getNotifications, getNotification, readNotification, readAllNotifications };
