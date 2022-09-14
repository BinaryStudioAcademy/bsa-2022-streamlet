import { CONFIG } from 'tests/config/config';

global.appConfig = {
  envName: CONFIG.ENV_NAME,
  baseUrl: CONFIG.BASE_URL,
  swaggerUrl: CONFIG.SWAGGER_URL,

  users: {
    defaultUser: {
      email: CONFIG.USER_EMAIL,
      password: CONFIG.USER_PASSWORD,
    },
  },
};
