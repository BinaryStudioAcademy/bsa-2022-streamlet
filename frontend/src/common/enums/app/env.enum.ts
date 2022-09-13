const { REACT_APP_API_ORIGIN_URL, REACT_APP_SERVER_HOST, REACT_APP_PUSH_PORT, REACT_APP_VIDEO_FALLBACK_BASE_URL } =
  process.env;

const ENV = {
  API_PATH: REACT_APP_API_ORIGIN_URL ?? '',
  SERVER_HOST: REACT_APP_SERVER_HOST || 'localhost',
  PUSH_PORT: REACT_APP_PUSH_PORT ? Number(REACT_APP_PUSH_PORT) : '',
  // when video url supplied to video player is relative
  // it will automatically add this url at the beginning
  VIDEO_FALLBACK_BASE_URL: REACT_APP_VIDEO_FALLBACK_BASE_URL || 'http://localhost:5001',
} as const;

export { ENV };
