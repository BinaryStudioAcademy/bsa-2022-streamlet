const { REACT_APP_API_ORIGIN_URL, PUSH_HOST, PUSH_PORT } = process.env;

const ENV = {
  API_PATH: REACT_APP_API_ORIGIN_URL ?? '',
  PUSH_HOST: PUSH_HOST || 'localhost',
  PUSH_PORT: Number(PUSH_PORT) || 5002,
} as const;

export { ENV };
