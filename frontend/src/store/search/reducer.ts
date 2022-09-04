import { createReducer } from '@reduxjs/toolkit';
import { VideoCard as VideoCardType } from 'common/types/types';
import { DataStatus } from 'common/enums/enums';

import { TypeFilterId, DateFilterId, DurationFilterId, SortByFilterId, FilterType } from './models';
import {
  setSearchText,
  setActiveFilterIds,
  clearActiveFilterIds,
  clearSearchResults,
  setSearchResults,
} from './actions';

type State = {
  searchText: string;
  activeFilterId: {
    [FilterType.TYPE]: TypeFilterId;
    [FilterType.DATE]: DateFilterId;
    [FilterType.DURATION]: DurationFilterId;
    [FilterType.SORT_BY]: SortByFilterId;
  };
  results: {
    list: VideoCardType[];
    total: number;
    dataStatus: DataStatus;
    error: boolean | undefined;
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
  results: {
    list: [],
    total: 0,
    dataStatus: DataStatus.IDLE,
    error: undefined,
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

  builder.addCase(clearSearchResults, (state: State) => {
    state.activeFilterId = initialState.activeFilterId;
    state.results = initialState.results;
  });

  builder.addCase(setSearchResults.rejected, (state) => {
    state.results.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(setSearchResults.pending, (state) => {
    state.results.list = initialState.results.list;
    state.results.total = initialState.results.total;
    state.results.error = initialState.results.error;
    state.results.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(setSearchResults.fulfilled, (state, { payload }) => {
    state.results.list = payload.list;
    state.results.total = payload.total;
    state.results.dataStatus = DataStatus.FULFILLED;
  });
});

export { reducer, type State };
