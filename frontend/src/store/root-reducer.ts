import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';
import { reducer as search } from './search/reducer';
import { reducer as profile } from './profile/reducer';
import { reducer as notification } from './notification/reducer';
import { reducer as layout } from './layout/reducer';
import { reducer as channel } from './channel/reducer';
import { reducer as theme } from './theme-switch/reducer';
import { reducer as videos } from './videos/reducer';
import { reducer as videoPage } from './video-page/reducer';
import { reducer as category } from './categories/reducer';
import { reducer as chat } from './chat/reducer';
import { reducer as subscriptions } from './subscriptions/reducer';

const rootReducer = combineReducers({
  auth,
  layout,
  search,
  profile,
  theme,
  notification,
  channel,
  videos,
  videoPage,
  category,
  chat,
  subscriptions,
});

export { rootReducer };
