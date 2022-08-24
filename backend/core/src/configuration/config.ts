import { config } from 'dotenv';
import { Level } from 'pino';
import { AppEnvironment, LogLevel } from '../shared/enums/enums';

interface AppConfig {
  PORT: number;
  HOST: string;
  RABBITMQ_URL: string;
  NODE_ENV: AppEnvironment;
  LOGGER: {
    level: Level;
  };
  DI_CONTAINER_MODULES_PATHS: string[];
}

interface DatabaseConfig {
  DATABASE_URL: string;
}

interface ApiConfig {
  PREFIX: string;
}

interface EncryptionConfig {
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_LIFETIME: string;
  REFRESH_SECRET: string;
  REFRESH_LIFETIME: string;
  RESET_PASSWORD_TOKEN_SECRET: string;
  RESET_PASSWORD_TOKEN_LIFETIME: string;
  VERIFICATION_TOKEN_SECRET: string;
  VERIFICATION_TOKEN_LIFETIME: string;
}

interface CloudConfig {
  NAME: string;
  API_KEY: string;
  API_SECRET: string;
}

interface MailServiceConfig {
  ADDRESS: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  REDIRECT_URI: string;
  REFRESH_TOKEN: string;
}

interface ClientInfo {
  URL: string;
}

export interface ConfigInterface {
  APP: AppConfig;
  DATABASE: DatabaseConfig;
  IMAGE_CLOUD_STORAGE: CloudConfig;
  API: ApiConfig;
  ENCRYPTION: EncryptionConfig;
  MAIL_SERVICE: MailServiceConfig;
  CLIENT_INFO: ClientInfo;
}

const isDevEnvironment = (nodeEnv = ''): boolean => nodeEnv === AppEnvironment.DEVELOPMENT;

const configuration = (): ConfigInterface => {
  config();

  const {
    NODE_ENV,
    HOST,
    PORT,
    DATABASE_URL,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME,
    API_BASE_PREFIX,
    MAIL_ADDRESS,
    MAIL_CLIENT_ID,
    MAIL_CLIENT_SECRET,
    MAIL_REDIRECT_URI,
    MAIL_REFRESH_TOKEN,
    RABBITMQ_PORT,
    RABBITMQ_HOST,
    CLIENT_URL,
  } = process.env;

  const host = HOST || 'localhost';
  const rabbitMqHost = RABBITMQ_HOST || 'localhost';
  const port = Number(PORT) || 5000;
  const rabbitMqPort = Number(RABBITMQ_PORT) || 5672;
  const extension = isDevEnvironment(NODE_ENV) ? '.ts' : '.js';

  return {
    APP: {
      PORT: port,
      HOST: isDevEnvironment(NODE_ENV) ? `${host}:${port}` : host,
      RABBITMQ_URL: `amqp://${rabbitMqHost}:${rabbitMqPort}`,
      NODE_ENV: <AppEnvironment>NODE_ENV || AppEnvironment.DEVELOPMENT,
      LOGGER: {
        level: isDevEnvironment(NODE_ENV) ? LogLevel.DEBUG : LogLevel.INFO,
      },
      DI_CONTAINER_MODULES_PATHS: [
        __dirname + '/../core/**/*-container-module' + extension,
        __dirname + '/../primary-adapters/**/*-container-module' + extension,
        __dirname + '/../secondary-adapters/**/*-container-module' + extension,
      ],
    },
    DATABASE: {
      DATABASE_URL: DATABASE_URL || '',
    },
    IMAGE_CLOUD_STORAGE: {
      NAME: CLOUDINARY_NAME || '',
      API_KEY: CLOUDINARY_API_KEY || '',
      API_SECRET: CLOUDINARY_API_SECRET || '',
    },
    API: {
      PREFIX: API_BASE_PREFIX || '',
    },
    ENCRYPTION: getEncryptionConfig(),
    MAIL_SERVICE: {
      ADDRESS: MAIL_ADDRESS || '',
      CLIENT_ID: MAIL_CLIENT_ID || '',
      CLIENT_SECRET: MAIL_CLIENT_SECRET || '',
      REDIRECT_URI: MAIL_REDIRECT_URI || '',
      REFRESH_TOKEN: MAIL_REFRESH_TOKEN || '',
    },
    CLIENT_INFO: {
      URL: CLIENT_URL || 'http://localhost:3000',
    },
  };
};

const getEncryptionConfig = (): EncryptionConfig => {
  const {
    ACCESS_TOKEN_SECRET,
    REFRESH_SECRET,
    RESET_PASSWORD_TOKEN_SECRET,
    VERIFICATION_TOKEN_SECRET,
    ACCESS_TOKEN_LIFETIME,
    REFRESH_LIFETIME,
    RESET_PASSWORD_TOKEN_LIFETIME,
    VERIFICATION_TOKEN_LIFETIME,
  } = process.env;

  if (!ACCESS_TOKEN_SECRET || !REFRESH_SECRET || !RESET_PASSWORD_TOKEN_SECRET || !VERIFICATION_TOKEN_SECRET) {
    throw new Error('Missing jwt secrets in env');
  }
  return {
    ACCESS_TOKEN_SECRET,
    REFRESH_SECRET,
    RESET_PASSWORD_TOKEN_SECRET,
    VERIFICATION_TOKEN_SECRET,
    REFRESH_LIFETIME: REFRESH_LIFETIME || encryptionConfigDefault.REFRESH_LIFETIME,
    ACCESS_TOKEN_LIFETIME: ACCESS_TOKEN_LIFETIME || encryptionConfigDefault.ACCESS_TOKEN_LIFETIME,
    RESET_PASSWORD_TOKEN_LIFETIME:
      RESET_PASSWORD_TOKEN_LIFETIME || encryptionConfigDefault.RESET_PASSWORD_TOKEN_LIFETIME,
    VERIFICATION_TOKEN_LIFETIME: VERIFICATION_TOKEN_LIFETIME || encryptionConfigDefault.VERIFICATION_TOKEN_LIFETIME,
  };
};

const encryptionConfigDefault = {
  ACCESS_TOKEN_LIFETIME: '5m',
  REFRESH_LIFETIME: '30d',
  RESET_PASSWORD_TOKEN_LIFETIME: '30m',
  VERIFICATION_TOKEN_LIFETIME: '30m',
};

const CONFIG = configuration();

export { CONFIG };
