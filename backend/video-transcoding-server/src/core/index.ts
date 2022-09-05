import path from 'path';
import { logger } from '~/config/logger';
import { folderWatcher } from '~/helpers';
import { amqpService, FsService } from '~/services';
import { AmqpQueue, ProcessPreset } from '~/shared';
import { createProcess } from './ffmpeg-process';
import { initStore } from './init-store';

export const transcode = ({ streamKey, videoId }: { streamKey: string; videoId: string }): void => {
  const presets = [ProcessPreset._360P_30FPS, ProcessPreset._480P_30FPS, ProcessPreset._720P_30FPS];
  initStore({ videoId, presets });
  const processes = createProcess({
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

  amqpService.consume({
    queue: AmqpQueue.PREVIEW_STOPPED,
    onMessage: (data) => {
      if (data) {
        const { videoId: id } = JSON.parse(data.toString('utf-8'));
        logger.info(`preview stopped, videoId: ${videoId}`);
        if (videoId === id) {
          //not sure about this solution
          processes.map((process) => process.kill('SIGINT'));

          const staticPath = path.resolve(__dirname, '../../playback');
          FsService.emptyFolder({
            path: path.resolve(staticPath, videoId),
          });
          setTimeout(() => {
            initStore({ videoId, presets });
          }, 1000);

          const reacreatedProcesses = createProcess({
            presets,
            streamKey,
            videoId,
          });
          reacreatedProcesses.map((process) => process.run());
        }
      }
    },
  });
};
