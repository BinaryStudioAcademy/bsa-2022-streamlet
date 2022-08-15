import { PreInterceptor } from './interceptor';
import { getAccessToken } from 'helpers/helpers';

export const attachAuthTokenInterceptor: PreInterceptor = ({ url, options }) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    options.headers = { ...options.headers, 'Authorization': accessToken };
  }
  return Promise.resolve([url, options]);
};
