export const errorCodes = {
  auth: {
    signIn: {
      UNVERIFIED: 'AUTH_SIGN_IN_UNVERIFIED',
    },
    restorePassword: {
      INCORRECT_TOKEN: 'AUTH_RESTORE_PASS_INCORRECT_TOKEN',
    },
  },
  stream: {
    NO_CHANNELS: 'NO_CHANNELS_CREATED_TO_STREAM',
    FORBIDDEN: 'FORBIDDEN_CHANNEL_ACTION',
    NOT_FOUND: 'CHANNEL_NOT_FOUND',
    ACTIVE_STREAM_EXISTS: 'ACTIVE_STREAM_EXISTS',
  },
  video: {
    NO_VIDEOS: 'NO_VIDEOS_FOUND',
  },
} as const;
