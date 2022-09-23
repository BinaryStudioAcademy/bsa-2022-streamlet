import path from 'path';
import { CONFIG } from '~/config/config';
import { FsService } from '~/services';

export const addVodToPlaylists = async (videoId: string): Promise<void> => {
  const pathToStreamFolder = path.resolve(CONFIG.playbackPath, videoId);

  await FsService.replaceInFile({
    path: path.resolve(pathToStreamFolder, 'playlist-360p30.m3u8'),
    replace: '#EXTM3U',
    text: '#EXTM3U\n#EXT-X-PLAYLIST-TYPE:VOD',
  });
  await FsService.replaceInFile({
    path: path.resolve(pathToStreamFolder, 'playlist-480p30.m3u8'),
    replace: '#EXTM3U',
    text: '#EXTM3U\n#EXT-X-PLAYLIST-TYPE:VOD',
  });
  await FsService.replaceInFile({
    path: path.resolve(pathToStreamFolder, 'playlist-720p30.m3u8'),
    replace: '#EXTM3U',
    text: '#EXTM3U\n#EXT-X-PLAYLIST-TYPE:VOD',
  });
};
