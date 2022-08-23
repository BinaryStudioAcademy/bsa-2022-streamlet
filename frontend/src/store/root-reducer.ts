import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';
import { reducer as search } from './search/reducer';
import { reducer as notification } from './notification/reducer';
import { reducer as layout } from './layout/reducer';
import { reducer as theme } from './theme-switch/reducer';
import { reducer as videos } from './videos/reducer';

const rootReducer = combineReducers({
  auth,
  layout,
  search,
  theme,
  notification,
  videos,
});

export { rootReducer };
