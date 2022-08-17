enum AppRoute {
  ROOT = '/',
  BROWSE = '/browse',
  FOLLOWING = '/following',
  HISTORY = '/history',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  RESTORE_PASSWORD = '/restore-password',
  ANY = '*',
  VIDEO = '/video',
  VIDEO_$ID = '/video/:videoId',
  CHANNEL = '/channel',
  CHANNEL_$ID = '/channel/:channelId',
  STUDIO = '/studio',
  ANALYTICS = '/analytics',
  SEARCH = '/search',
}

enum RoutesWithoutHeader {
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  RESTORE_PASSWORD = '/restore-password',
}

export { AppRoute, RoutesWithoutHeader };
