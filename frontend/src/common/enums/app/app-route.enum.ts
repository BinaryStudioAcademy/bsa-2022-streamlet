enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  RESTORE_PASSWORD = '/restore-password',
  ANY = '*',
  VIDEO_$ID = '/video/:videoId',
  CHANNEL_$ID = '/channel/:channelId',
  STUDIO = '/studio',
  ANALYTICS = '/analytics',
}

export { AppRoute };
