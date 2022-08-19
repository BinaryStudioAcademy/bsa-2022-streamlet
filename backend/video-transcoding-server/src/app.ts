import { amqpService } from './services';
import { AmqpQueue } from './shared';
import { logger } from './config/logger';
import { transcode } from './core';

export function bootstrapApp(): void {
  amqpService.consume({
    queue: AmqpQueue.STREAM_TRANSCODER,
    onMessage: (data) => {
      if (data) {
        const { streamingKey, videoId } = JSON.parse(data.toString('utf-8'));
        logger.info(`Rabbit -> ${streamingKey} ${videoId}`);
        transcode({ streamKey: streamingKey, videoId });
      }
    },
  });

  // transcode({ streamKey: "STREAM_NAME", videoId: "432924239" });
}
