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

export interface ConfigInterface {
  APP: AppConfig;
  DATABASE: DatabaseConfig;
  API: ApiConfig;
  ENCRYPTION: EncryptionConfig;
}

const isDevEnvironment = (nodeEnv = ''): boolean => nodeEnv === AppEnvironment.DEVELOPMENT;

const configuration = (): ConfigInterface => {
  config();

  const { NODE_ENV, HOST, PORT, RABBITMQ_PORT, DATABASE_URL, API_BASE_PREFIX } = process.env;

  const host = HOST || 'localhost';
  const port = Number(PORT) || 5000;
  const rabbitMqPort = Number(RABBITMQ_PORT) || 5672;
  const extension = isDevEnvironment(NODE_ENV) ? '.ts' : '.js';

  return {
    APP: {
      PORT: port,
      HOST: `http://${host}:${port}`,
      RABBITMQ_URL: `amqp://${host}:${rabbitMqPort}`,
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
    API: {
      PREFIX: API_BASE_PREFIX || '',
    },
    ENCRYPTION: getEncryptionConfig(),
  };
};

const getEncryptionConfig = (): EncryptionConfig => {
  const { REFRESH_TOKEN_BYTES, JWT_SECRET, JWT_LIFETIME } = process.env;

  if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in env');
  }
  return {
    REFRESH_TOKEN_BYTES: REFRESH_TOKEN_BYTES ? Number(REFRESH_TOKEN_BYTES) : 64,
    JWT_SECRET,
    JWT_LIFETIME: JWT_LIFETIME || '5m',
  };
};

const CONFIG = configuration();

export { CONFIG };
