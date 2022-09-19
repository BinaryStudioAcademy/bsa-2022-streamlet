import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { VideoInfoDto } from 'shared/build';
import { changePrivacy, deleteVideo, editInfo, getMyVideos, pickAllVideo, pickVideo, unloadVideos } from './actions';

type State = {
  data: Array<
    VideoInfoDto & {
      isActive: boolean;
    }
  >;
  dataStatus: DataStatus;
  error: boolean;
};

const initialState: State = {
  data: [],
  dataStatus: DataStatus.IDLE,
  error: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getMyVideos.pending, (state) => {
    state.error = false;
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getMyVideos.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.data = payload.map((video) => ({
      ...video,
      isActive: false,
    }));
  });
  builder.addCase(getMyVideos.rejected, (state) => {
    state.error = true;
    state.data = [];
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(changePrivacy.pending, (state) => {
    state.error = false;
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(changePrivacy.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.data = [...state.data].map((video) => {
      const found = payload.find(({ id }) => video.id === id);
      return found
        ? {
            ...found,
            isActive: false,
          }
        : video;
    });
  });
  builder.addCase(changePrivacy.rejected, (state) => {
    state.error = true;
    state.data = [];
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(editInfo.pending, (state) => {
    state.error = false;
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(editInfo.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;

    state.data = [
      ...state.data.map((video) => {
        return payload.id === video.id
          ? {
              ...payload,
              isActive: false,
            }
          : video;
      }),
    ];
  });
  builder.addCase(editInfo.rejected, (state) => {
    state.error = true;
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(deleteVideo.pending, (state) => {
    state.error = false;
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(deleteVideo.fulfilled, (state, { payload }) => {
    state.error = false;
    const deletedVideoIds = payload.map((video) => video.id);
    state.data = [...state.data].filter((video) => deletedVideoIds.indexOf(video.id) === -1);
    state.dataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(deleteVideo.rejected, (state) => {
    state.error = true;
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(unloadVideos, (state) => {
    state.error = false;
    state.data = [];
    state.dataStatus = DataStatus.IDLE;
  });

  builder.addCase(pickVideo, (state, { payload }) => {
    state.data = state.data.map((video) => {
      return {
        ...video,
        isActive: video.id === payload.id ? !video.isActive : video.isActive,
      };
    });
  });

  builder.addCase(pickAllVideo, (state, { payload }) => {
    state.data = state.data.map((video) => ({ ...video, isActive: payload.isPick }));
  });
});

export { reducer };
