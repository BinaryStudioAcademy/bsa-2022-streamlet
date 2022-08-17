import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';
import { reducer as search } from './search/reducer';
import { reducer as profile } from './profile/reducer';

const rootReducer = combineReducers({
  auth,
  search,
  profile,
});

export { rootReducer };
