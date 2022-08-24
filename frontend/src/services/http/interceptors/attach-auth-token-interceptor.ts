import { tokensStorageService } from 'services/services';
import { PreInterceptor } from './interceptor';

export const attachAuthTokenInterceptor: PreInterceptor = ({ url, options }) => {
  const accessToken = tokensStorageService.getTokens().accessToken;
  if (accessToken) {
    (options.headers as Headers).set('Authorization', `Bearer ${accessToken}`);
  }
  return Promise.resolve([url, options]);
};
