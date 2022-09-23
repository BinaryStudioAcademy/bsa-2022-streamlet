import { configureStore } from '@reduxjs/toolkit';

import {
  authApi,
  profileApi,
  notificationApi,
  videoApi,
  categoryApi,
  channelCrudApi,
  channelSubscriptionApi,
  statsApi,
  chatApi,
  commentApi,
  historyApi,
  followingApi,
  searchApi,
  channelStreamingApi,
  preferencesApi,
} from 'services/services';
import { rootReducer } from './root-reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { injectStore as injectStoreRefreshInterceptor } from 'services/http/interceptors/refresh-token-interceptor';

const extraArgument = {
  authApi,
  profileApi,
  notificationApi,
  channelCrudApi,
  channelSubscriptionApi,
  statsApi,
  videoApi,
  categoryApi,
  chatApi,
  commentApi,
  historyApi,
  followingApi,
  channelStreamingApi,
  searchApi,
  preferencesApi,
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
      serializableCheck: false,
    });
  },
});

injectStoreRefreshInterceptor(store);

const persistor = persistStore(store);

type storeType = typeof store;

export { extraArgument, store, persistor, type storeType };
