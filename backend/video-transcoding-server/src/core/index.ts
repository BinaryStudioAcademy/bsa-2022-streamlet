import path from 'path';
import { logger } from '~/config/logger';
import { folderWatcher } from '~/helpers';
import { amqpService, FsService } from '~/services';
import { AmqpQueue, ProcessPreset } from '~/shared';
import { createProcess } from './ffmpeg-process';
import { initStore } from './init-store';

export const transcode = async ({ streamKey, videoId }: { streamKey: string; videoId: string }): Promise<void> => {
  const presets = [ProcessPreset._360P_30FPS, ProcessPreset._480P_30FPS, ProcessPreset._720P_30FPS];
  await initStore({ videoId, presets });
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

  const restartStream = async (data: Buffer | null): Promise<void> => {
    if (!data) {
      return;
    }

    const { videoId: id } = JSON.parse(data.toString('utf-8'));
    logger.info(`preview stopped, videoId: ${videoId}`);

    if (videoId !== id) {
      return;
    }

    processes.map((process) => process.kill('SIGINT'));

    const staticPath = path.resolve(__dirname, '../../playback');

    FsService.emptyFolder({ path: path.resolve(staticPath, videoId) }).then(() => {
      initStore({ videoId, presets });
    });

    const reacreatedProcesses = createProcess({
      presets,
      streamKey,
      videoId,
    });

    reacreatedProcesses.map((process) => process.run());
  };

  amqpService.consume({
    queue: AmqpQueue.PREVIEW_STOPPED,
    onMessage: restartStream,
  });
};
