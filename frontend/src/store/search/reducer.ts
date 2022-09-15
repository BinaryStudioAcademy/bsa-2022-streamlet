import { createReducer } from '@reduxjs/toolkit';
import { SearchDataResponseDto } from 'common/types/types';
import { DataStatus } from 'common/enums/enums';

import { TypeFilterId, DateFilterId, DurationFilterId, SortByFilterId, FilterType } from './models';
import {
  setSearchText,
  setActiveFilterIds,
  clearActiveFilterIds,
  clearSearchResults,
  setSearchResults,
  updateChannelCardSubscriptionCount,
} from './actions';
import { updateItemIfExists } from 'helpers/helpers';

type State = {
  searchText: string;
  activeFilterId: {
    [FilterType.TYPE]: TypeFilterId;
    [FilterType.DATE]: DateFilterId;
    [FilterType.DURATION]: DurationFilterId;
    [FilterType.SORT_BY]: SortByFilterId;
  };
  results: {
    channels: SearchDataResponseDto['channels'];
    videos: SearchDataResponseDto['videos'];
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
    channels: {
      list: [],
      total: 0,
    },
    videos: {
      list: [],
      total: 0,
    },
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setSearchText, (state: State, action) => {
    state.searchText = action.payload.split(/\s+/).join(' ');
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
    state.results.channels = initialState.results.channels;
    state.results.videos = initialState.results.videos;
    state.results.error = initialState.results.error;
    state.results.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(setSearchResults.fulfilled, (state, { payload }) => {
    state.results.channels = payload.channels;
    state.results.videos = payload.videos;
    state.results.dataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(updateChannelCardSubscriptionCount, (state: State, { payload }) => {
    if (state.results.channels.list.length === 0) {
      return state;
    }
    const channels = [...state.results.channels.list];
    state.results.channels.list = updateItemIfExists(channels, { id: payload.id }, { subscribersCount: payload.count });
  });
});

export { reducer, type State };
