import { commonFrontendPaths } from 'shared/build/common/enums/enums';

const AppParams = {
  channelId: 'channelId',
} as const;

const AppRoutes = {
  ROOT: '/',
  BROWSE: '/browse',
  FOLLOWING: '/following',
  HISTORY: '/history',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  RESTORE_PASSWORD_INIT: '/restore-password',
  RESTORE_PASSWORD_CONFIRM: commonFrontendPaths.auth.RESET_PASSWORD_CONFIRM.path,
  ACCOUNT_VERIFICATION_CONFIRM: commonFrontendPaths.auth.ACCOUNT_VERIFICATION_CONFIRM.path,
  ACCOUNT_VERIFICATION_INIT: '/account-verify-init',
  ANY: '*',
  VIDEO: '/video',
  VIDEO_$ID: '/video/:videoId',
  CHANNEL_$ID: `/channel/:${AppParams.channelId}`,
  CHANNEL: '/channel',
  STUDIO: '/studio/home',
  STUDIO_ANALYTICS: '/studio/analytics',
  STUDIO_CHANNEL: '/studio/channel',
  STUDIO_STREAM_$ID: '/studio/stream/:id',
  SEARCH: '/search',
  PROFILE_PREFERENCE: '/profile-preference',
  GOOGLE_ATHORIZATION: '/google-athorization',
} as const;

type AppRoute = typeof AppRoutes[keyof typeof AppRoutes];

const RoutesWithoutHeader = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  RESTORE_PASSWORD_INIT: '/restore-password',
  RESTORE_PASSWORD_CONFIRM: commonFrontendPaths.auth.RESET_PASSWORD_CONFIRM.path,
  ACCOUNT_VERIFICATION_CONFIRM: commonFrontendPaths.auth.ACCOUNT_VERIFICATION_CONFIRM.path,
  ACCOUNT_VERIFICATION_INIT: '/account-verify-init',
} as const;

enum RoutesWithStudioHeader {
  STUDIO = '/studio/home',
  STUDIO_ANALYTICS = '/studio/analytics',
  STUDIO_CHANNEL = '/studio/channel',
  STUDIO_STREAM_$ID = '/studio/stream/:id',
}

type RouteWithoutHeader = typeof RoutesWithoutHeader[keyof typeof RoutesWithoutHeader];

export { AppRoute, AppRoutes, RouteWithoutHeader, RoutesWithoutHeader, RoutesWithStudioHeader, AppParams };
