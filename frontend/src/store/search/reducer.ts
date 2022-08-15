import { createReducer } from '@reduxjs/toolkit';

import { TypeFilterId, DateFilterId, DurationFilterId, SortByFilterId, SearchQueryParam } from './models';
import {
  setSearchText,
  setActiveTypeFilterId,
  setActiveDateFilterId,
  setActiveDurationFilterId,
  setActiveSortByFilterId,
  clearActiveFilterIds,
} from './actions';

type State = {
  searchText: string;
  searchUrlParams: string;
  activeFilterId: {
    type: string;
    date: string;
    duration: string;
    sortBy: string;
  };
};

const initialState: State = {
  searchText: '',
  searchUrlParams: '',
  activeFilterId: {
    type: TypeFilterId.ALL,
    date: DateFilterId.ANYTIME,
    duration: DurationFilterId.ANY,
    sortBy: SortByFilterId.DEFAULT,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setSearchText, (state: State, action) => {
    const newSearchUrlParams = new URLSearchParams(state.searchUrlParams);
    newSearchUrlParams.set(SearchQueryParam.SEARCH_TEXT, action.payload);

    state.searchText = action.payload;
    state.searchUrlParams = newSearchUrlParams.toString();
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
  builder.addCase(clearActiveFilterIds, (state: State) => {
    state.activeFilterId = {
      type: TypeFilterId.ALL,
      date: DateFilterId.ANYTIME,
      duration: DurationFilterId.ANY,
      sortBy: SortByFilterId.DEFAULT,
    };
  });
});

export { reducer };
