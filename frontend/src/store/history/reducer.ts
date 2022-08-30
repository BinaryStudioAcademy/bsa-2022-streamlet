import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';

import { addVideoHistoryRecord, getUserVideoHistoryRecord } from './actions';
import { HistoryListType } from 'shared/build';

type State = {
  data: {
    currentPage: number;
    lastPage: number;
    dataStatus: DataStatus;
    error: string | undefined;
    list: HistoryListType[];
  };
};

const initialState: State = {
  data: {
    list: [],
    lastPage: 1,
    currentPage: 1,
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(addVideoHistoryRecord.pending, (state) => {
    state.data.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(getUserVideoHistoryRecord.pending, (state) => {
    state.data.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(addVideoHistoryRecord.fulfilled, (state, { payload }) => {
    state.data = {
      ...payload,
      dataStatus: DataStatus.FULFILLED,
      error: undefined,
    };
  });

  builder.addCase(getUserVideoHistoryRecord.fulfilled, (state, { payload }) => {
    const newList = state.data.list.concat(payload.list);
    state.data = {
      ...payload,
      list: newList,
      error: undefined,
      dataStatus: DataStatus.FULFILLED,
    };
  });
});

export { reducer };
