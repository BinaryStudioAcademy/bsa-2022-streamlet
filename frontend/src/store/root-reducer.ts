import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';
import { reducer as search } from './search/reducer';

const rootReducer = combineReducers({
  auth,
  search,
});

export { rootReducer };
