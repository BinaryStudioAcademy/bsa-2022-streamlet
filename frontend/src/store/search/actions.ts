import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { DataVideo } from 'shared/build';

import { ActionType } from './common';
import { State } from './reducer';

const setSearchText = createAction<string>(ActionType.SET_SEARCH_TEXT);

const setActiveFilterIds = createAction<Partial<State['activeFilterId']>>(ActionType.SET_ACTIVE_FILTERS_IDS);

const clearActiveFilterIds = createAction(ActionType.CLEAR_ACTIVE_FILTER_IDS);

const clearSearchResults = createAction(ActionType.CLEAR_SEARCH_RESULTS);

const setSearchResults = createAsyncThunk<DataVideo, { searchParamURL: string }, AsyncThunkConfig>(
  ActionType.SET_SEARCH_RESULTS,
  async (searchPayload, { extra: { searchApi } }) => {
    return searchApi.getSearchResults(searchPayload);
  },
);

export { setSearchText, setActiveFilterIds, clearActiveFilterIds, clearSearchResults, setSearchResults };
