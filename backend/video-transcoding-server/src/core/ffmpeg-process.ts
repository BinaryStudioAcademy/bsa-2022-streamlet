import { logger } from '~/config/logger';
import { FfmpegFactory } from '~/factories';
import { amqpService } from '~/services';
import { AmqpQueue } from '~/shared';

export const createProcess = ({ input, videoId }: { input: string; videoId: string }): void => {
  const process720p30 = FfmpegFactory.create({
    videoId,
    input,
    width: 1280,
    height: 720,
    fps: 30,
  });
  const process480p30 = FfmpegFactory.create({
    videoId,
    input,
    width: 720,
    height: 480,
    fps: 30,
  });
  const process360p30 = FfmpegFactory.create({
    videoId,
    input,
    width: 480,
    height: 360,
    fps: 30,
  });

  process720p30.run();
  process480p30.run();
  process360p30.run();

  process720p30.on('end', () => {
    logger.info(`Rabbit -> STREAM_INTERRUPTED ({ videoId: ${videoId} }).`);
    amqpService.sendToQueue({
      queue: AmqpQueue.STREAM_INTERRUPTED,
      content: Buffer.from(
        JSON.stringify({
          videoId,
        }),
      ),
    });
  });
};
