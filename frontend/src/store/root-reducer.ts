import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';
import { reducer as search } from './search/reducer';
import { reducer as layout } from './layout/reducer';

const rootReducer = combineReducers({
  auth,
  layout,
  search,
});

export { rootReducer };
