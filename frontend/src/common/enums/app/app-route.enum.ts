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
  ANY: '*',
  VIDEO_$ID: '/video/:videoId',
  CHANNEL_$ID: `/channel/:${AppParams.channelId}`,
  STUDIO: '/studio',
  ANALYTICS: '/analytics',
  SEARCH: '/search',
} as const;

type AppRoute = typeof AppRoutes[keyof typeof AppRoutes];

const RoutesWithoutHeader = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  RESTORE_PASSWORD_INIT: '/restore-password',
  RESTORE_PASSWORD_CONFIRM: commonFrontendPaths.auth.RESET_PASSWORD_CONFIRM.path,
  ACCOUNT_VERIFICATION_CONFIRM: commonFrontendPaths.auth.ACCOUNT_VERIFICATION_CONFIRM.path,
} as const;

type RouteWithoutHeader = typeof RoutesWithoutHeader[keyof typeof RoutesWithoutHeader];

export { AppRoute, AppRoutes, RouteWithoutHeader, RoutesWithoutHeader, AppParams };
