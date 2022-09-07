import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { clearPreferences, pickPreference } from './actions';

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
  builder.addCase(pickPreference, (state, { payload }) => {
    state.data = [...state.data, payload.id].filter((id) => payload.id !== id || payload.picked);
  });

  builder.addCase(clearPreferences, (state) => {
    state.data = [];
  });
});

export { reducer };
