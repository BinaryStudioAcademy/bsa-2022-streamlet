import path from 'path';
import { logger } from '~/config/logger';
import { createRtmpUrl, folderWatcher } from '~/helpers';
import { amqpService } from '~/services';
import { AmqpQueue } from '~/shared';
import { createProcess } from './ffmpeg-process';
import { initStore } from './init-store';

export const transcode = ({ streamKey, videoId }: { streamKey: string; videoId: string }): void => {
  initStore({ videoId });
  const input = createRtmpUrl(streamKey);
  logger.info({ input });
  createProcess({
    input: 'playback/2022-08-18-13-27-22.mp4',
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
