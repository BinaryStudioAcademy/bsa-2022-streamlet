import { createMasterPlaylist } from '~/helpers';
import { FsService } from '~/services';
import path from 'path';
import { ProcessPreset } from '~/shared';

export const initStore = async ({ videoId, presets }: { videoId: string; presets: ProcessPreset[] }): Promise<void> => {
  const staticPath = path.resolve(__dirname, '../../playback');
  await FsService.createFolder({ path: path.resolve(staticPath, videoId) });
  await createMasterPlaylist(path.resolve(staticPath, videoId), presets);
};
