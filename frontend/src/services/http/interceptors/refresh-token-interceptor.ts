import { PostInterceptor } from './interceptor';
import { store } from 'store/store';
import { logout, refreshTokens } from 'store/auth/actions';
import { getRefreshToken } from 'helpers/helpers';
import { attachAuthTokenInterceptor } from './attach-auth-token-interceptor';

const REFRESH_STATUS_CODE = 401;

export const refreshTokenInterceptorFactory: (getUserId: () => string | undefined) => PostInterceptor =
  (getUserId) =>
  async ({ initialRequest: { options, url }, response, makeRequestFn }): Promise<Response> => {
    if (response.status !== REFRESH_STATUS_CODE) {
      return Promise.resolve(response);
    }
    const refreshToken = getRefreshToken();
    const userId = getUserId();
    if (!userId || !refreshToken) {
      return Promise.resolve(response);
    }
    try {
      await store
        .dispatch(
          refreshTokens({
            userId,
            refreshToken,
          }),
        )
        .unwrap();

      // attach access token, but do not try to refresh again
      const newOptions = (await attachAuthTokenInterceptor({ options, url }))[1];
      const newResponsePromise = makeRequestFn(url, newOptions);
      return newResponsePromise;
    } catch (e: unknown) {
      store.dispatch(logout());
      throw e;
    }
  };
