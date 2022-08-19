import { logger } from '~/config/logger';
import { FfmpegFactory } from '~/factories';
import { createRtmpUrl } from '~/helpers';
import { amqpService } from '~/services';
import { AmqpQueue } from '~/shared';

export const createProcess = ({ streamKey, videoId }: { streamKey: string; videoId: string }): void => {
  const input = createRtmpUrl(streamKey);
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

  amqpService.consume({
    queue: AmqpQueue.STREAM_INTERRUPTED,
    onMessage: (data) => {
      if (data) {
        const { streamingKey } = JSON.parse(data.toString('utf-8'));
        logger.info(`interrupted ${streamKey} ${streamingKey}`);
        if (streamingKey === streamKey) {
          process360p30.kill('SIGKILL');
          process480p30.kill('SIGKILL');
          process720p30.kill('SIGKILL');

          logger.info(`Rabbit -> STREAM_INTERRUPTED ({ videoId: ${videoId} }).`);
          amqpService.sendToQueue({
            queue: AmqpQueue.STREAM_INTERRUPTED_DONE,
            content: Buffer.from(
              JSON.stringify({
                videoId,
              }),
            ),
          });
        }
      }
    },
  });
};
