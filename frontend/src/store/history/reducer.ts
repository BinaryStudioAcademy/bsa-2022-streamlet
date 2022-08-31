import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';

import { addVideoHistoryRecord, getUserVideoHistoryRecord } from './actions';
import { HistoryListType } from 'shared/build';
import { isObjectUniqueIdContainInTwoArray } from '../../helpers/helpers';

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
    state.data.error = undefined;
  });

  builder.addCase(addVideoHistoryRecord.fulfilled, (state) => {
    state.data.dataStatus = DataStatus.FULFILLED;
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
      dataStatus: DataStatus.FULFILLED,
    };
  });
});

export { reducer };
