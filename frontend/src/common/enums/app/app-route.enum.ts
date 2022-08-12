enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  STUDIO = '/studio',
  ANALYTICS = '/analytics',
  RESTORE_PASSWORD = '/restore-password',
  ANY = '*',
  VIDEO_$ID = '/video/:videoId',
  CHANNEL_$ID = '/channel/:channelId',
}

export { AppRoute };
