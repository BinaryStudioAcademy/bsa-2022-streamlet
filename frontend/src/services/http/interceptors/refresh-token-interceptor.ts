import { PostInterceptor } from './interceptor';
import { store } from 'store/store';
import { logout, refreshTokens } from 'store/auth/actions';
import { tokensStorageService } from 'services/services';
import { attachAuthTokenInterceptor } from './attach-auth-token-interceptor';

const REFRESH_STATUS_CODE = 401;

export const refreshTokenInterceptor: PostInterceptor = async ({
  initialRequest: { options, url },
  response,
  makeRequestFn,
}): Promise<Response> => {
  if (response.status !== REFRESH_STATUS_CODE) {
    return Promise.resolve(response);
  }
  const { refreshToken } = tokensStorageService.getTokens();
  if (!refreshToken) {
    return Promise.resolve(response);
  }
  try {
    await store
      .dispatch(
        refreshTokens({
          refreshToken,
        }),
      )
      .unwrap();

    // attach access token, but do not try to refresh again
    const newOptions = (await attachAuthTokenInterceptor({ options, url }))[1];
    const newResponsePromise = makeRequestFn(url, newOptions);
    return newResponsePromise;
  } catch (e: unknown) {
    // in the above try block the only thing that could go wrong is refreshing token
    // which can go wrong if the refresh token is invalid
    // in this case it's pointless to hit api to log out on backend, since it'll only create an endless loop of refreshing
    await store.dispatch(logout({ hitApi: false })).unwrap();
    throw e;
  }
};
