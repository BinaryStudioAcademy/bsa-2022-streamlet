import { config } from 'dotenv';

export interface ServerConfig {
  ffmpegPath: string;
  rtmpHost: string;
  rtmpPort: number;
  rabbitmqUrl: string;
  playbackPath: string;
}

const configuration = (): ServerConfig => {
  config();

  const { FFMPEG_PATH, RTMP_HOST, RTMP_PORT, RABBITMQ_HOST, RABBITMQ_PORT, PLAYBACK_PATH } = process.env;

  return {
    ffmpegPath: FFMPEG_PATH || '/usr/bin/ffmpeg',
    rtmpHost: RTMP_HOST || 'localhost',
    rtmpPort: Number(RTMP_PORT) || 1935,
    rabbitmqUrl: `amqp://${RABBITMQ_HOST || 'localhost'}:${Number(RABBITMQ_PORT) || 5672}`,
    playbackPath: PLAYBACK_PATH || '/playback',
  };
};

export const CONFIG = configuration();
