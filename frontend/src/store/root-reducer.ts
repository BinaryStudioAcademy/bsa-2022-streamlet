import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';
import { reducer as search } from './search/reducer';
import { reducer as notification } from './notification/reducer';

const rootReducer = combineReducers({
  auth,
  search,
  notification,
});

export { rootReducer };
