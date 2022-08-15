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
  REFRESH_TOKEN_BYTES: number;
  JWT_SECRET: string;
  JWT_LIFETIME: string;
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

export interface ConfigInterface {
  APP: AppConfig;
  DATABASE: DatabaseConfig;
  IMAGE_CLOUD_STORAGE: CloudConfig;
  API: ApiConfig;
  ENCRYPTION: EncryptionConfig;
  MAIL_SERVICE: MailServiceConfig;
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
  };
};

const getEncryptionConfig = (): EncryptionConfig => {
  const { REFRESH_TOKEN_BYTES, JWT_SECRET, JWT_LIFETIME } = process.env;

  if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in env');
  }
  return {
    REFRESH_TOKEN_BYTES: REFRESH_TOKEN_BYTES
      ? Number(REFRESH_TOKEN_BYTES)
      : encryptionConfigDefault.REFRESH_TOKEN_BYTES,
    JWT_SECRET,
    JWT_LIFETIME: JWT_LIFETIME || encryptionConfigDefault.JWT_LIFETIME,
  };
};

const encryptionConfigDefault = {
  JWT_LIFETIME: '5m',
  REFRESH_TOKEN_BYTES: 64,
};

const CONFIG = configuration();

export { CONFIG };
