import { createMasterPlaylist } from '~/helpers';
import { FsService } from '~/services';
import path from 'path';
import { ProcessPreset } from '~/shared';
import { CONFIG } from '~/config/config';

export const initStore = async ({ videoId, presets }: { videoId: string; presets: ProcessPreset[] }): Promise<void> => {
  const pathToStreamFolder = path.resolve(CONFIG.playbackPath, videoId);
  await FsService.createFolder({ path: pathToStreamFolder });
  await createMasterPlaylist(pathToStreamFolder, presets);
};
