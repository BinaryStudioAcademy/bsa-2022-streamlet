enum ActionType {
  SIGN_UP = 'auth/sign-up',
  SIGN_IN = 'auth/sign-in',
  REFRESH_TOKENS = 'auth/refresh-tokens',
  SIGN_OUT = 'auth/sign-out',
  LOAD_CURRENT_USER = 'auth/load-current-user',
  SIGN_IN_GOOGLE = 'auth/sign-in-google',
  GOOGLE_ATHORIZATION = 'auth/google-athorization',
  STREAM_PERMISSION = 'auth/stream-permission',
  STREAM_PERMISSION_UPDATE = 'auth/stream-permission-update',
  SET_PATH_FOR_BACK_TO_STREAM_VIDEO = 'auth/path_to_back_to_stream_video',
}

export { ActionType };
