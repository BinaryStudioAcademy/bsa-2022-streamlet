import { configureStore } from '@reduxjs/toolkit';

import { AuthApi, Http } from 'services/services';
import { rootReducer } from './root-reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { attachAuthTokenInterceptor } from 'services/http/interceptors/attach-auth-token-interceptor';
import { PostInterceptor } from 'services/http/interceptors/interceptor';
import { ENV } from 'common/enums/enums';
import { refreshTokenInterceptorFactory } from 'services/http/interceptors/refresh-token-interceptor';

const httpPostInterceptors: PostInterceptor[] = [];
const http = new Http([attachAuthTokenInterceptor], httpPostInterceptors);
const authApi = new AuthApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const extraArgument = {
  authApi,
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
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

httpPostInterceptors.push(refreshTokenInterceptorFactory(() => store.getState().auth.user?.id));

const persistor = persistStore(store);

export { extraArgument, store, persistor };
