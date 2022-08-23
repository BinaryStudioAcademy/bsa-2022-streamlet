import { createReducer } from '@reduxjs/toolkit';
import { getUserHistory } from './actions';
import { HistoryResponseDto } from 'common/types/types';
import { DataStatus } from '../../common/enums/app/data-status.enum';

interface InitState {
  userHistory: {
    data: HistoryResponseDto[] | null;
    dataStatus: DataStatus;
    error: string | undefined;
  };
}

const initialState: InitState = {
  userHistory: {
    data: null,
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getUserHistory.fulfilled, (state, { payload }) => {
      state.userHistory = {
        error: undefined,
        data: payload,
        dataStatus: DataStatus.FULFILLED,
      };
    })
    .addCase(getUserHistory.rejected, (state, { error }) => {
      state.userHistory = {
        error: error.message,
        dataStatus: DataStatus.REJECTED,
        data: null,
      };
    })
    .addCase(getUserHistory.pending, (state) => {
      state.userHistory = {
        error: undefined,
        dataStatus: DataStatus.PENDING,
        data: null,
      };
    });
});

export { reducer };
