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
  CHANNEL_$ID = '/channel/:channelId',
  STUDIO = '/studio/home',
  STUDIO_ANALYTICS = '/studio/analytics',
  STUDIO_CHANNEL = '/studio/channel',
  STUDIO_STREAM_$ID = '/studio/stream/:streamId',
  SEARCH = '/search',
  PROFILE_PREFERENCE = '/profile-preference',
}

enum RoutesWithStudioHeader {
  STUDIO = '/studio/home',
  STUDIO_ANALYTICS = '/studio/analytics',
  STUDIO_CHANNEL = '/studio/channel',
  STUDIO_STREAM_$ID = '/studio/stream/:streamId',
}

enum RoutesWithoutHeader {
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  RESTORE_PASSWORD = '/restore-password',
}

export { AppRoute, RoutesWithoutHeader, RoutesWithStudioHeader };
