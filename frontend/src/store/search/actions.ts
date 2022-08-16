import { createAction } from '@reduxjs/toolkit';

import { ActionType } from './common';
import { State } from './reducer';

const setSearchText = createAction<string>(ActionType.SET_SEARCH_TEXT);

const setActiveFilterIds = createAction<Partial<State['activeFilterId']>>(ActionType.SET_ACTIVE_FILTERS_IDS);

const clearActiveFilterIds = createAction(ActionType.CLEAR_ACTIVE_FILTER_IDS);

export { setSearchText, setActiveFilterIds, clearActiveFilterIds };
