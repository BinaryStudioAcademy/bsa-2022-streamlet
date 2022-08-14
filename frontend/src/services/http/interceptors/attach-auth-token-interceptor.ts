import { PreInterceptor } from './interceptor';
import { store } from 'store/store';

export const attachAuthTokenInterceptor: PreInterceptor = (url, options) => {
  const accessToken = store.getState().auth.tokens?.accessToken;
  if (accessToken) {
    options.headers = { ...options.headers, 'Authorization': accessToken };
  }
  return Promise.resolve([url, options]);
};
