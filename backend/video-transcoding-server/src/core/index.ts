import path from 'path';
import { logger } from '~/config/logger';
import { folderWatcher } from '~/helpers';
import { amqpService } from '~/services';
import { AmqpQueue, ProcessPreset } from '~/shared';
import { createProcess } from './ffmpeg-process';
import { initStore } from './init-store';

export const transcode = ({ streamKey, videoId }: { streamKey: string; videoId: string }): void => {
  const presets = [ProcessPreset._360P_30FPS, ProcessPreset._480P_30FPS, ProcessPreset._720P_30FPS];
  initStore({ videoId, presets });
  createProcess({
    presets,
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
