import { createReducer } from '@reduxjs/toolkit';

import { toggleShowFilter } from './actions';

type State = {
  isFilterShown: boolean;
};

const initialState: State = {
  isFilterShown: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleShowFilter, (state: State) => {
    state.isFilterShown = !state.isFilterShown;
  });
});

export { reducer };
