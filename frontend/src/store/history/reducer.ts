import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';

import { getUserVideoHistoryRecord } from './actions';
import { HistoryListType } from 'shared/build';
import { isObjectUniqueIdContainInTwoArray } from '../../helpers/helpers';

type State = {
  data: {
    currentPage: number;
    lastPage: number;
    dataStatus: DataStatus;
    isFirstHistoryPageLoad: boolean;
    error: string | undefined;
    list: HistoryListType[];
  };
};

const initialState: State = {
  data: {
    list: [],
    isFirstHistoryPageLoad: true,
    lastPage: -1,
    currentPage: -1,
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
      isFirstHistoryPageLoad: false,
      error: undefined,
      dataStatus: DataStatus.FULFILLED,
    };
  });

  builder.addCase(getUserVideoHistoryRecord.rejected, (state, { error }) => {
    state.data.dataStatus = DataStatus.REJECTED;
    state.data.error = error.message;
  });
});

export { reducer };
