import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { CategoryResponseDto } from 'shared/build';
import { getCategories } from './actions';

type State = {
  data: Array<
    CategoryResponseDto & {
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
  builder.addCase(getCategories.pending, (state) => {
    state.error = false;
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(getCategories.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.data = payload.map((category) => ({
      ...category,
      isActive: false,
    }));
  });

  builder.addCase(getCategories.rejected, (state) => {
    state.error = true;
    state.data = [];
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
