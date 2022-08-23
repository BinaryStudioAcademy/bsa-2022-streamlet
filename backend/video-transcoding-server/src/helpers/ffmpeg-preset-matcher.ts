import { FffmpegProcessCreatorDto, ProcessPreset } from '~/shared';

export const presetMatch: Record<ProcessPreset, Omit<FffmpegProcessCreatorDto, 'input' | 'videoId'>> = {
  [ProcessPreset._360P_30FPS]: {
    width: 480,
    height: 360,
    fps: 30,
  },
  [ProcessPreset._480P_30FPS]: {
    width: 720,
    height: 480,
    fps: 30,
  },
  [ProcessPreset._720P_30FPS]: {
    width: 1280,
    height: 720,
    fps: 30,
  },
};
