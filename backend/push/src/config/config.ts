import { config } from 'dotenv';

export interface AppConfig {
  host: string;
  port: number;
  rabbitmqUrl: string;
}

const configuration = (): AppConfig => {
  config();

  const { HOST, PORT, RABBITMQ_HOST, RABBITMQ_PORT } = process.env;

  return {
    host: HOST || 'localhost',
    port: Number(PORT) || 5002,
    rabbitmqUrl: `amqp://${RABBITMQ_HOST || 'localhost'}:${Number(RABBITMQ_PORT) || 5672}`,
  };
};

export const CONFIG = configuration();
