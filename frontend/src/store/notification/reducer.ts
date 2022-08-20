import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { NOTIFICATION_REQUEST_SIZE } from 'common/constants/constants';
import { DataStatus, NotificationType } from 'common/enums/enums';
import { NotificationBaseResponseDto, NotificationListResponseDto } from 'common/types/types';
import { getNotification, getNotifications, readAllNotifications, readNotification } from './actions';

const notificationsMockup: NotificationListResponseDto = {
  notifications: [
    {
      'id': '281f1c2f-a54e-435b-a55f-ff868f5a6a5e',
      'type': NotificationType.STREAM_START,
      'link': '/videos/25391635-8dd2-4298-9943-c79e741ab79b',
      'username': 'boutibridge0',
      'videoName': 'lofi hip hop radio - beats to sleep/chill to',
      'createdAt': new Date('2022-08-10T19:51:32Z'),
      'isViewed': true,
      'avatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/ff4444/ffffff',
    },
    {
      'id': '281f1c2f-a546-435b-a55f-ff868f5a6a5e',
      'type': NotificationType.TEXT_MESSAGE,
      'createdAt': new Date('2022-08-11T22:32:52Z'),
      'isViewed': false,
      'message':
        'Testing message function! Please look how it looks with long string of text, since I want to create a perfect notification bar.',
    },
    {
      'id': '281f1c2f-a54e-445b-a55f-ff868f5a6a5e',
      'type': NotificationType.STREAM_START,
      'link': '/videos/25391635-8dd2-4298-9943-c79e741ab79b',
      'username': 'clillyman2',
      'videoName': 'Streaming Portal 2 speedrunning until I beat my record',
      'createdAt': new Date('2022-08-10T06:54:40Z'),
      'isViewed': true,
      'avatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/5fa2dd/ffffff',
    },
  ],
  total: 3,
};

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  notifications: NotificationBaseResponseDto[];
  total: number;
  loaded: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: undefined,
  notifications: notificationsMockup.notifications,
  total: notificationsMockup.total,
  loaded: 3,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      dataStatus: DataStatus.FULFILLED,
      loaded: Math.min(state.total, state.loaded + NOTIFICATION_REQUEST_SIZE),
    };
  });
  builder.addCase(getNotification.fulfilled, (state, { payload }) => {
    const newArray = state.notifications.slice();
    newArray.splice(0, 0, payload);
    return {
      ...state,
      notifications: newArray,
      total: state.total + 1,
      loaded: state.loaded + 1,
      dataStatus: DataStatus.FULFILLED,
    };
  });
  builder.addCase(readAllNotifications.fulfilled, (state) => {
    return {
      ...state,
      notifications: [],
      total: 0,
      loaded: 0,
    };
  });
  builder.addCase(readNotification.fulfilled, (state, { payload }) => {
    return {
      ...state,
      notifications: state.notifications.filter((notification) => payload.id !== notification.id),
      total: state.total - 1,
    };
  });
  builder.addMatcher(
    isAnyOf(getNotification.pending, getNotifications.pending, readNotification.pending, readAllNotifications.pending),
    (state) => {
      state.dataStatus = DataStatus.PENDING;
      state.error = undefined;
    },
  );
  builder.addMatcher(
    isAnyOf(
      getNotification.rejected,
      getNotifications.rejected,
      readNotification.rejected,
      readAllNotifications.rejected,
    ),
    (state, { error }) => {
      state.dataStatus = DataStatus.REJECTED;
      state.error = error.message;
    },
  );
});

export { reducer };
