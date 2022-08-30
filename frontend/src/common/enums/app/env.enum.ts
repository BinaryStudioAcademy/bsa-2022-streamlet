const { REACT_APP_API_ORIGIN_URL, REACT_APP_PUSH_HOST, REACT_APP_PUSH_PORT } = process.env;

const ENV = {
  API_PATH: REACT_APP_API_ORIGIN_URL ?? '',
  PUSH_HOST: REACT_APP_PUSH_HOST || 'localhost',
  PUSH_PORT: Number(REACT_APP_PUSH_PORT) || 5002,
} as const;

export { ENV };
