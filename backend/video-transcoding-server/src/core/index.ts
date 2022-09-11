import { ProcessPreset } from '~/shared';
import { createProcess } from './ffmpeg-process';
import Ffmpeg from 'fluent-ffmpeg';

export const transcode = async (
  streamKey: string,
  videoId: string,
  presets: ProcessPreset[],
): Promise<Ffmpeg.FfmpegCommand[]> => {
  const transcodeProcesses = createProcess(presets, streamKey, videoId);
  transcodeProcesses.map((process) => process.run());
  return transcodeProcesses;
};
