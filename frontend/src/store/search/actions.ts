import { createAction } from '@reduxjs/toolkit';

import { ActionType } from './common';

const setSearchText = createAction<string>(ActionType.SET_SEARCH_TEXT);

const setActiveTypeFilterId = createAction<string>(ActionType.SET_ACTIVE_TYPE_FILTER_ID);

const setActiveDateFilterId = createAction<string>(ActionType.SET_ACTIVE_DATE_FILTER_ID);

const setActiveDurationFilterId = createAction<string>(ActionType.SET_ACTIVE_DURATION_FILTER_ID);

const setActiveSortByFilterId = createAction<string>(ActionType.SET_ACTIVE_SORT_BY_FILTER_ID);

const clearActiveFilterIds = createAction(ActionType.CLEAR_ACTIVE_FILTER_IDS);

export {
  setSearchText,
  setActiveTypeFilterId,
  setActiveDateFilterId,
  setActiveDurationFilterId,
  setActiveSortByFilterId,
  clearActiveFilterIds,
};
