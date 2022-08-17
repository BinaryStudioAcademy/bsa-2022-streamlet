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
  STUDIO = '/studio',
  ANALYTICS = '/analytics',
  SEARCH = '/search',
  PROFILE_PREFERENCE = '/profile-preference',
}

enum RoutesWithoutHeader {
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  RESTORE_PASSWORD = '/restore-password',
}

export { AppRoute, RoutesWithoutHeader };
