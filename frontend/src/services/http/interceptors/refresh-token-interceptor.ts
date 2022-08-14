import { PostInterceptor } from './interceptor';
import { store } from 'store/store';
import { logout, refreshTokens } from 'store/auth/actions';

const REFRESH_STATUS_CODE = 401;

export const refreshTokenInterceptor: PostInterceptor = async ({ initialRequestFn, response }): Promise<Response> => {
  if (response.status !== REFRESH_STATUS_CODE) {
    return Promise.resolve(response);
  }
  const { tokens, user } = store.getState().auth;
  if (!user || !tokens) {
    return Promise.resolve(response);
  }
  try {
    await store
      .dispatch(
        refreshTokens({
          refreshToken: tokens.refreshToken,
          userId: user.id,
        }),
      )
      .unwrap();
    const newResponsePromise = initialRequestFn();
    return newResponsePromise;
  } catch (e: unknown) {
    store.dispatch(logout());
    throw e;
  }
};
