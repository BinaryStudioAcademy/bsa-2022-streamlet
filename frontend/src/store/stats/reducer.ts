import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { getRejectedErrorData } from 'helpers/redux/get-rejected-error-data';
import { CreateVideoStatDto, errorCodes } from 'shared/build';
import { addVideoStat, updateVideoStat, sendVideoStats } from './actions';

type State = {
  video: {
    data: Record<string, { stats: { statId: number; data: Omit<CreateVideoStatDto, 'userId'> }[] }>;
    temp: Record<string, { stats: { statId: number; data: Omit<CreateVideoStatDto, 'userId'> }[] }>;
    dataStatus: DataStatus;
    error: string | undefined;
    errorCode: string | undefined;
  };
};

const initialState: State = {
  video: {
    data: {},
    temp: {},
    dataStatus: DataStatus.IDLE,
    error: undefined,
    errorCode: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(addVideoStat, (state, { payload }) => {
    let temp = { ...state.video.temp };
    if (Object.keys(temp).length !== 0) {
      if (state.video.dataStatus !== DataStatus.PENDING) {
        state.video.data = { ...temp };
        temp = {};
      }
    }

    if (!(payload.data.videoId in temp)) {
      temp[payload.data.videoId] = { stats: [] };
    }
    temp[payload.data.videoId].stats.push({
      statId: payload.statId,
      data: {
        ...payload.data,
        createdAt: new Date().toISOString(),
      },
    });

    state.video.temp = { ...temp };
  });

  builder.addCase(updateVideoStat, (state, { payload }) => {
    if (payload.data.videoId in state.video.temp) {
      const stats = [...state.video.temp[payload.data.videoId].stats];
      const index = stats.findIndex((s) => s.statId === payload.statId);
      if (index >= 0) {
        stats[index] = {
          ...stats[index],
          data: {
            ...stats[index].data,
            ...payload.data,
            watchTime: (stats[index].data.watchTime ?? 0) + (payload.data.watchTime ?? 0),
            commentsActivity: (stats[index].data.commentsActivity ?? 0) + (payload.data.commentsActivity ?? 0),
            chatsActivity: (stats[index].data.chatsActivity ?? 0) + (payload.data.chatsActivity ?? 0),
          },
        };
      }
      state.video.temp[payload.data.videoId].stats = [...stats];
    }
  });

  builder.addCase(sendVideoStats.rejected, (state, { error, payload }) => {
    state.video.dataStatus = DataStatus.REJECTED;

    const { errorCode, message } = getRejectedErrorData(error, payload);
    state.video.error = message;
    state.video.errorCode = errorCode;

    if (errorCode === errorCodes.video.NO_VIDEOS) {
      state.video.data = initialState.video.data;
    }
  });
  builder.addCase(sendVideoStats.pending, (state) => {
    state.video.dataStatus = DataStatus.PENDING;
    state.video.error = initialState.video.error;
    state.video.errorCode = initialState.video.errorCode;
  });
  builder.addCase(sendVideoStats.fulfilled, (state) => {
    state.video.dataStatus = DataStatus.FULFILLED;
    state.video.data = initialState.video.data;
  });
});

export { reducer };
