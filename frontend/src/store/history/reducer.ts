import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';

import { addVideoHistoryRecord } from './actions';
import { HistoryResponseDto } from 'shared/build';

type State = {
  history: {
    data: HistoryResponseDto[];
    dataStatus: DataStatus;
    error: string | undefined;
  };
};

const initialState: State = {
  history: {
    data: [],
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(addVideoHistoryRecord.pending, (state) => {
    state.history.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(addVideoHistoryRecord.fulfilled, (state, { payload }) => {
    state.history.data.push(payload);
    state.history.error = undefined;
  });
});

export { reducer };
