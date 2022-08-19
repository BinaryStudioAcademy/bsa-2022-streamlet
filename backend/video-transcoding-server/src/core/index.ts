import path from 'path';
import { logger } from '~/config/logger';
import { folderWatcher } from '~/helpers';
import { amqpService } from '~/services';
import { AmqpQueue } from '~/shared';
import { createProcess } from './ffmpeg-process';
import { initStore } from './init-store';

export const transcode = ({ streamKey, videoId }: { streamKey: string; videoId: string }): void => {
  initStore({ videoId });
  createProcess({
    streamKey,
    videoId,
  });
  folderWatcher(path.resolve(__dirname, `../../playback/${videoId}`), () => {
    logger.info(`Rabbit -> STREAM_DATA(${videoId})`);
    amqpService.sendToQueue({
      queue: AmqpQueue.STREAM_DATA,
      content: Buffer.from(
        JSON.stringify({
          videoId,
        }),
      ),
    });
  });
};
