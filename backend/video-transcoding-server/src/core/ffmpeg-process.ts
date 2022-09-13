import Ffmpeg from 'fluent-ffmpeg';
import { FfmpegFactory } from '~/factories';
import { createRtmpUrl } from '~/helpers';
import { presetMatch } from '~/helpers/ffmpeg-preset-matcher';
import { ProcessPreset } from '~/shared';

export const createProcess = (presets: ProcessPreset[], streamKey: string, videoId: string): Ffmpeg.FfmpegCommand[] => {
  const input = createRtmpUrl(streamKey);

  return presets.map((processType) => {
    const preset = presetMatch[processType];
    return FfmpegFactory.create({
      ...preset,
      videoId,
      input,
    });
  });
};
