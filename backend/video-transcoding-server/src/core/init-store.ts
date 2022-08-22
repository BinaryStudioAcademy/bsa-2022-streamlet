import { createMasterPlaylist } from '~/helpers';
import { FsService } from '~/services';
import path from 'path';
import { ProcessPreset } from '~/shared';

export const initStore = ({ videoId, presets }: { videoId: string; presets: ProcessPreset[] }): void => {
  const staticPath = path.resolve(__dirname, '../../playback');
  FsService.createFolder({ path: path.resolve(staticPath, videoId) });
  createMasterPlaylist(path.resolve(staticPath, videoId), presets);
};
