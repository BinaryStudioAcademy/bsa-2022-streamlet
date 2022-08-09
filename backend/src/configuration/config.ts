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

interface CloudConfig {
  NAME: string;
  API_KEY: string;
  API_SECRET: string;
}

export interface ConfigInterface {
  APP: AppConfig;
  DATABASE: DatabaseConfig;
  CLOUD: CloudConfig;
  API: ApiConfig;
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
    RABBITMQ_PORT,
    API_BASE_PREFIX,
  } = process.env;

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
    CLOUD: {
      NAME: CLOUDINARY_NAME || '',
      API_KEY: CLOUDINARY_API_KEY || '',
      API_SECRET: CLOUDINARY_API_SECRET || '',
    },
    API: {
      PREFIX: API_BASE_PREFIX || '',
    },
  };
};

const CONFIG = configuration();

export { CONFIG };
