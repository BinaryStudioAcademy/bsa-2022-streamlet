enum AppRoute {
  ROOT = '/',
  BROWSE = '/browse',
  FOLLOWING = '/following',
  HISTORY = '/history',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  RESTORE_PASSWORD = '/restore-password',
  ANY = '*',
  VIDEO_$ID = '/video/:videoId',
  CHANNEL_$ID = '/channel/:id',
  STUDIO = '/studio/home',
  STUDIO_ANALYTICS = '/studio/analytics',
  STUDIO_CHANNEL = '/studio/channel',
  STUDIO_STREAM_$ID = '/studio/stream/:id',
  SEARCH = '/search',
}

enum RoutesWithStudioHeader {
  STUDIO = '/studio/home',
  STUDIO_ANALYTICS = '/studio/analytics',
  STUDIO_CHANNEL = '/studio/channel',
  STUDIO_STREAM_$ID = '/studio/stream/:id',
}

enum RoutesWithoutHeader {
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  RESTORE_PASSWORD = '/restore-password',
}

export { AppRoute, RoutesWithoutHeader, RoutesWithStudioHeader };
