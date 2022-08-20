import Ffmpeg from 'fluent-ffmpeg';
import { logger } from '~/config/logger';
import { FfmpegFactory } from '~/factories';
import { createRtmpUrl } from '~/helpers';
import { presetMatch } from '~/helpers/ffmpeg-preset-matcher';
import { amqpService } from '~/services';
import { AmqpQueue, ProcessPreset } from '~/shared';

export const createProcess = ({
  presets,
  streamKey,
  videoId,
}: {
  presets: ProcessPreset[];
  streamKey: string;
  videoId: string;
}): Ffmpeg.FfmpegCommand[] => {
  const input = createRtmpUrl(streamKey);
  const processes = presets.map((processType) => {
    const preset = presetMatch[processType];
    return FfmpegFactory.create({
      ...preset,
      videoId,
      input,
    });
  });

  processes.map((process) => process.run());

  amqpService.consume({
    queue: AmqpQueue.STREAM_INTERRUPTED,
    onMessage: (data) => {
      if (data) {
        const { streamingKey } = JSON.parse(data.toString('utf-8'));
        logger.info(`interrupted ${streamKey} ${streamingKey}`);
        if (streamingKey === streamKey) {
          processes.map((process) => process.kill('SIGKILL'));

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

  return processes;
};
