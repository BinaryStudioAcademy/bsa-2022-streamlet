// import { amqpService } from './services';
// import { AmqpQueue } from './shared';
// import { logger } from './config/logger';
import { transcode } from './core';

export function bootstrapApp(): void {
  // amqpService.consume({
  //   queue: AmqpQueue.STREAM_TRANSCODER,
  //   onMessage: (data) => {
  //     if (data) {
  //       const { streamkey } = JSON.parse(data.toString('utf-8'));
  //       logger.info(`Rabbit -> ${streamkey}`);
  //       transcode({ streamKey: streamkey })
  //     }
  //   }
  // })
  transcode({ streamKey: 'STREAM_NAME', videoId: '5678293' });
}
