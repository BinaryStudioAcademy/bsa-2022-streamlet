import { tokensStorageService } from 'services/services';
import { PreInterceptor } from './interceptor';

export const attachAuthTokenInterceptor: PreInterceptor = ({ url, options }) => {
  const accessToken = tokensStorageService.getTokens().accessToken;
  if (accessToken) {
    options.headers = { ...options.headers, 'Authorization': `Bearer ${accessToken}` };
  }
  return Promise.resolve([url, options]);
};
