import { createReducer } from '@reduxjs/toolkit';

import { TypeFilterId, DateFilterId, DurationFilterId, SortByFilterId } from './models';
import {
  setSearchText,
  setActiveTypeFilterId,
  setActiveDateFilterId,
  setActiveDurationFilterId,
  setActiveSortByFilterId,
} from './actions';

type State = {
  searchText: string;
  activeFilterId: {
    type: string;
    date: string;
    duration: string;
    sortBy: string;
  };
};

const initialState: State = {
  searchText: '',
  activeFilterId: {
    type: TypeFilterId.ALL,
    date: DateFilterId.ANYTIME,
    duration: DurationFilterId.ANY,
    sortBy: SortByFilterId.DEFAULT,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setSearchText, (state: State, action) => {
    state.searchText = action.payload;
  });
  builder.addCase(setActiveTypeFilterId, (state: State, action) => {
    state.activeFilterId.type = action.payload;
  });
  builder.addCase(setActiveDateFilterId, (state: State, action) => {
    state.activeFilterId.date = action.payload;
  });
  builder.addCase(setActiveDurationFilterId, (state: State, action) => {
    state.activeFilterId.duration = action.payload;
  });
  builder.addCase(setActiveSortByFilterId, (state: State, action) => {
    state.activeFilterId.sortBy = action.payload;
  });
});

export { reducer };
