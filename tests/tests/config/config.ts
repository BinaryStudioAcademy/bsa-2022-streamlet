import { config } from 'dotenv';

interface Configuration {
  ENV_NAME: string;
  BASE_URL: string;
  SWAGGER_URL: string;
  USER_EMAIL: string;
  USER_PASSWORD: string;
}

const configuration = (): Configuration => {
  config();

  const { TESTS_ENV_NAME, TESTS_BASE_URL, TESTS_SWAGGER_URL, TESTS_USER_EMAIL, TESTS_USER_PASSWORD } = process.env;

  const envName = TESTS_ENV_NAME || '';
  const baseUrl = TESTS_BASE_URL || '';
  const swaggerUrl = TESTS_SWAGGER_URL || '';
  const userEmail = TESTS_USER_EMAIL || '';
  const userPassword = TESTS_USER_PASSWORD || '';

  return {
    ENV_NAME: envName,
    BASE_URL: baseUrl,
    SWAGGER_URL: swaggerUrl,
    USER_EMAIL: userEmail,
    USER_PASSWORD: userPassword,
  };
};

const CONFIG = configuration();

export { CONFIG };
