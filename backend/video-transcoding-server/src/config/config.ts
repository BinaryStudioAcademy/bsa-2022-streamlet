import { config } from 'dotenv';

export interface ServerConfig {
  rtmpHost: string;
  rtmpPort: number;
  rabbitmqHost: string;
  rabbitmqPort: number;
}

const configuration = (): ServerConfig => {
  config();

  const { RTMP_HOST, RTMP_PORT, RABBITMQ_HOST, RABBITMQ_PORT } = process.env;

  return {
    rtmpHost: RTMP_HOST || 'localhost',
    rtmpPort: Number(RTMP_PORT) || 1935,
    rabbitmqHost: RABBITMQ_HOST || 'localhost',
    rabbitmqPort: Number(RABBITMQ_PORT) || 5672,
  };
};

export const CONFIG = configuration();
