import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { VideoInfoDto } from 'shared/build';
import { changePrivacy, editInfo, getMyVideos, pickAllVideo, pickVideo, unloadVideos } from './actions';

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
    state.data = [...state.data].map((video) => ({
      ...video,
      privacy: video.id === payload.id ? payload.privacy : video.privacy,
    }));
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
    // const editedPayload = payload.map(({ id, name, description }) => ({
    //   id,
    //   name,
    //   description,
    // }));
    // state.data = [
    //   ...state.data.map((video) => {
    //     if (editedIds.includes(video.id)) {
    //       return {
    //         ...video,
    //         ...editedPayload.filter((payload) => payload.id === video.id),
    //       };
    //     }
    //     return {
    //       ...video,
    //     };
    //   }),
    // ];
  });
  builder.addCase(editInfo.rejected, (state) => {
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
