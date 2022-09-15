import { CONFIG } from '../../config/config';

export const appConfig = {
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
