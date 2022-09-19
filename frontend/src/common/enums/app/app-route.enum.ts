import { commonFrontendPaths } from 'shared/build/common/enums/enums';

const AppParams = {
  channelId: 'channelId',
  videoId: 'videoId',
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
  VIDEO_$ID: `/video/:${AppParams.videoId}`,
  CHANNEL_$ID: `/channel/:${AppParams.channelId}`,
  CHANNEL: '/channel',
  STUDIO: '/studio/home',
  STUDIO_ANALYTICS: '/studio/analytics',
  STUDIO_CHANNEL: '/studio/channel',
  STUDIO_CONTENT: '/studio/content',
  SEARCH: '/search',
  PROFILE_PREFERENCE: '/profile-preference',
  GOOGLE_ATHORIZATION: '/google-athorization',
  LIVE_CHAT: '/live_chat',
} as const;

type AppRoute = typeof AppRoutes[keyof typeof AppRoutes];

const RoutesWithoutHeader = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  RESTORE_PASSWORD_INIT: '/restore-password',
  RESTORE_PASSWORD_CONFIRM: commonFrontendPaths.auth.RESET_PASSWORD_CONFIRM.path,
  ACCOUNT_VERIFICATION_CONFIRM: commonFrontendPaths.auth.ACCOUNT_VERIFICATION_CONFIRM.path,
  ACCOUNT_VERIFICATION_INIT: '/account-verify-init',
  LIVE_CHAT: '/live_chat',
} as const;

const RoutesWithStudioHeader = {
  STUDIO: '/studio/home',
  STUDIO_ANALYTICS: '/studio/analytics',
  STUDIO_CHANNEL: '/studio/channel',
  STUDIO_CONTENT: '/studio/content',
};

type RouteWithoutHeader = typeof RoutesWithoutHeader[keyof typeof RoutesWithoutHeader];

export { AppRoute, AppRoutes, RouteWithoutHeader, RoutesWithoutHeader, RoutesWithStudioHeader, AppParams };
