import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';
import { reducer as search } from './search/reducer';
import { reducer as notification } from './notification/reducer';
import { reducer as layout } from './layout/reducer';
import { reducer as video } from './video/reducer';
import { reducer as channel } from './channel/reducer';

const rootReducer = combineReducers({
  channel,
  auth,
  layout,
  search,
  video,
  notification,
});

export { rootReducer };
