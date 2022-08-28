import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { CategoryResponseDto } from 'shared/build';
import { activeCategory, clearFilters, getCategories } from './actions';

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

  builder.addCase(activeCategory, (state, { payload }) => {
    state.data = state.data.map((category) => {
      return {
        ...category,
        isActive: category.id === payload.id ? !category.isActive : category.isActive,
      };
    });
  });

  builder.addCase(clearFilters, (state, _) => {
    state.data = state.data.map((category) => {
      return {
        ...category,
        isActive: false,
      };
    });
  });
});

export { reducer };
