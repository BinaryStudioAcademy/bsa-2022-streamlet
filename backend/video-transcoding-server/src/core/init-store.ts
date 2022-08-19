import { createMasterPlaylist } from '~/helpers';
import { FsService } from '~/services';
import path from 'path';

export const initStore = ({ videoId }: { videoId: string }): void => {
  const staticPath = path.resolve(__dirname, '../../playback');
  FsService.createFolder({ path: path.resolve(staticPath, videoId) });
  createMasterPlaylist(path.resolve(staticPath, videoId));
};
