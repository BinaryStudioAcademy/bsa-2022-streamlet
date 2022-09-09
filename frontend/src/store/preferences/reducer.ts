import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { loadPreferences, bindPreferences, chooseAllPreferences } from './actions';

type State = {
  data: Array<string>;
  dataStatus: DataStatus;
  error: boolean;
};

const initialState: State = {
  data: [],
  dataStatus: DataStatus.IDLE,
  error: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addMatcher(
    isAnyOf(loadPreferences.fulfilled, bindPreferences.fulfilled, chooseAllPreferences.fulfilled),
    (state, { payload }) => {
      state.data = payload.map((preference) => preference.id);
      state.dataStatus = DataStatus.FULFILLED;
      state.error = false;
    },
  );

  builder.addMatcher(
    isAnyOf(loadPreferences.pending, bindPreferences.pending, chooseAllPreferences.pending),
    (state) => {
      state.data = [];
      state.dataStatus = DataStatus.PENDING;
      state.error = false;
    },
  );

  builder.addMatcher(
    isAnyOf(loadPreferences.rejected, bindPreferences.rejected, chooseAllPreferences.rejected),
    (state) => {
      state.data = [];
      state.dataStatus = DataStatus.REJECTED;
      state.error = true;
    },
  );
});

export { reducer };
