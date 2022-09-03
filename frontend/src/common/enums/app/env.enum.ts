const { REACT_APP_API_ORIGIN_URL, REACT_APP_PUSH_HOST, REACT_APP_PUSH_PORT, REACT_APP_VIDEO_FALLBACK_BASE_URL } =
  process.env;

const ENV = {
  API_PATH: REACT_APP_API_ORIGIN_URL ?? '',
  PUSH_HOST: REACT_APP_PUSH_HOST || 'localhost',
  PUSH_PORT: Number(REACT_APP_PUSH_PORT) || 5002,
  // when video url supplied to video player is relative
  // it will automatically add this url at the beginning
  VIDEO_FALLBACK_BASE_URL: REACT_APP_VIDEO_FALLBACK_BASE_URL || 'https://dev.streamlet.tk',
} as const;

export { ENV };
