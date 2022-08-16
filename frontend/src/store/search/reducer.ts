import { createReducer } from '@reduxjs/toolkit';

import { TypeFilterId, DateFilterId, DurationFilterId, SortByFilterId, FilterType } from './models';
import { setSearchText, setActiveFilterIds, clearActiveFilterIds } from './actions';

type State = {
  searchText: string;
  activeFilterId: {
    [FilterType.TYPE]: TypeFilterId;
    [FilterType.DATE]: DateFilterId;
    [FilterType.DURATION]: DurationFilterId;
    [FilterType.SORT_BY]: SortByFilterId;
  };
};

const initialState: State = {
  searchText: '',
  activeFilterId: {
    [FilterType.TYPE]: TypeFilterId.ALL,
    [FilterType.DATE]: DateFilterId.ANYTIME,
    [FilterType.DURATION]: DurationFilterId.ANY,
    [FilterType.SORT_BY]: SortByFilterId.DEFAULT,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setSearchText, (state: State, action) => {
    state.searchText = action.payload;
  });
  builder.addCase(setActiveFilterIds, (state: State, action) => {
    state.activeFilterId = {
      ...state.activeFilterId,
      ...action.payload,
    };
  });
  builder.addCase(clearActiveFilterIds, (state: State) => {
    state.activeFilterId = initialState.activeFilterId;
  });
});

export { reducer, type State };
