import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { NotificationsResponseDto } from 'common/types/types';
import { loadNotifications } from './actions';

const notificationsMockup: NotificationsResponseDto = {
  notifications: [
    {
      'id': '281f1c2f-a54e-435b-a55f-ff868f5a6a5e',
      'videoId': '25391635-8dd2-4298-9943-c79e741ab79b',
      'username': 'boutibridge0',
      'videoName': 'lofi hip hop radio - beats to sleep/chill to',
      'createdAt': new Date('2022-08-10T19:51:32Z'),
      'isViewed': true,
      'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/ff4444/ffffff',
    },
    {
      'id': '281f1c2f-a546-435b-a55f-ff868f5a6a5e',
      'videoId': '25391635-8dd2-4298-9943-c79e741ab79b',
      'username': 'abambrick1',
      'videoName': '[Valheim] Trying not to die',
      'createdAt': new Date('2022-08-11T22:32:52Z'),
      'isViewed': false,
      'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/5fa2dd/ffffff',
    },
    {
      'id': '281f1c2f-a54e-445b-a55f-ff868f5a6a5e',
      'videoId': '25391635-8dd2-4298-9943-c79e741ab79b',
      'username': 'clillyman2',
      'videoName': 'Streaming Portal 2 speedrunning until I beat my record',
      'createdAt': new Date('2022-08-10T06:54:40Z'),
      'isViewed': true,
      'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/5fa2dd/ffffff',
    },
  ],
  total: 3,
};

type State = {
  dataStatus: DataStatus;
  error: string | null;
  notifications: NotificationsResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: null,
  notifications: notificationsMockup,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadNotifications.fulfilled, (state, { payload }) => {
    state.notifications = payload;
  });
});

export { reducer };
