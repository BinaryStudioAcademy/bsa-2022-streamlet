import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';
import { reducer as search } from './search/reducer';
import { reducer as profile } from './profile/reducer';
import { reducer as notification } from './notification/reducer';
import { reducer as layout } from './layout/reducer';
import { reducer as channel } from './channel/reducer';
import { reducer as theme } from './theme-switch/reducer';
import { reducer as videos } from './videos/reducer';

const rootReducer = combineReducers({
  auth,
  layout,
  search,
  profile,
  theme,
  notification,
  channel,
  videos,
});

export { rootReducer };
