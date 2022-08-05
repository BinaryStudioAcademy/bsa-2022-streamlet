const { REACT_APP_API_ORIGIN_URL } = process.env;

const ENV = {
  API_PATH: REACT_APP_API_ORIGIN_URL ?? '',
} as const;

export { ENV };
