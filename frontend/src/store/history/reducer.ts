import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';

import { deleteAllUserHistory, getUserVideoHistoryRecord } from './actions';
import { HistoryListType } from 'shared/build';
import { isObjectUniqueIdContainInTwoArray } from '../../helpers/helpers';

type State = {
  data: {
    currentPage: number;
    lastPage: number;
    dataStatus: DataStatus;
    deleteStatus: DataStatus;
    error: string | undefined;
    list: HistoryListType[];
  };
};

const initialState: State = {
  data: {
    list: [],
    lastPage: 1,
    currentPage: 1,
    deleteStatus: DataStatus.IDLE,
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUserVideoHistoryRecord.pending, (state) => {
    state.data.dataStatus = DataStatus.PENDING;
    state.data.error = undefined;
  });

  builder.addCase(getUserVideoHistoryRecord.fulfilled, (state, { payload }) => {
    let newList: HistoryListType[] = state.data.list;

    if (!isObjectUniqueIdContainInTwoArray(newList, payload.list)) {
      newList = state.data.list.concat(payload.list);
    }

    state.data = {
      ...payload,
      list: newList,
      error: undefined,
      deleteStatus: DataStatus.IDLE,
      dataStatus: DataStatus.FULFILLED,
    };
  });

  builder.addCase(getUserVideoHistoryRecord.rejected, (state, { error }) => {
    state.data.dataStatus = DataStatus.REJECTED;
    state.data.error = error.message;
  });

  builder.addCase(deleteAllUserHistory.rejected, (state, { error }) => {
    state.data.deleteStatus = DataStatus.REJECTED;
    state.data.error = error.message;
  });

  builder.addCase(deleteAllUserHistory.pending, (state) => {
    state.data.deleteStatus = DataStatus.PENDING;
    state.data.error = undefined;
  });

  builder.addCase(deleteAllUserHistory.fulfilled, (state) => {
    state.data.deleteStatus = DataStatus.FULFILLED;
    state.data.list = [];
    state.data.error = undefined;
  });
});

export { reducer };
