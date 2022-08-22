import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';
import { reducer as search } from './search/reducer';
import { reducer as notification } from './notification/reducer';
import { reducer as layout } from './layout/reducer';
import { reducer as channelPage } from './channel-page/reducer';

const rootReducer = combineReducers({
  auth,
  layout,
  search,
  notification,
  channelPage,
});

export { rootReducer };
