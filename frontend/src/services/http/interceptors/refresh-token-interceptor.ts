import { PostInterceptor } from './interceptor';
import { type storeType } from 'store/store';
import { signOut, refreshTokens } from 'store/auth/actions';
import { tokensStorageService } from 'services/services';
import { attachAuthTokenInterceptor } from './attach-auth-token-interceptor';

let injectedStore: storeType | undefined;

export const injectStore = (store: storeType): void => {
  injectedStore = store;
};

const REFRESH_STATUS_CODE = 401;

export const refreshTokenInterceptor: PostInterceptor = async ({
  initialRequest: { options, url },
  response,
  makeRequestFn,
}): Promise<Response> => {
  if (!injectedStore) {
    throw Error('Please inject redux-store in refresh-token-interceptor');
  }
  if (response.status !== REFRESH_STATUS_CODE) {
    return Promise.resolve(response);
  }
  const { refreshToken } = tokensStorageService.getTokens();
  if (!refreshToken) {
    return Promise.resolve(response);
  }
  try {
    await injectedStore
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
    // in this case it's pointless to hit api to sign out on backend, since it'll only create an endless loop of refreshing
    await injectedStore.dispatch(signOut({ hitApi: false })).unwrap();
    throw e;
  }
};
