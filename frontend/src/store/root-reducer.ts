import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';

const rootReducer = combineReducers({
  auth,
});

export { rootReducer };
