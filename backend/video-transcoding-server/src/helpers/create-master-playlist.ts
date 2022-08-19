import { FsService } from '~/services';

export const createMasterPlaylist = (path: string): void => {
  FsService.createFile({
    path,
    filename: 'master.m3u8',
    content: [
      '#EXTM3U',
      '#EXT-X-VERSION:3',
      '#EXT-X-STREAM-INF:BANDWIDTH=3797200,RESOLUTION=1280x720,CODECS="avc1.4d4020,mp4a.40.2"',
      'playlist-720p30.m3u8',
      '',
      '#EXT-X-STREAM-INF:BANDWIDTH=3797200,RESOLUTION=852x480,CODECS="avc1.4d401f,mp4a.40.2"',
      'playlist-480p30.m3u8',
      '',
      '#EXT-X-STREAM-INF:BANDWIDTH=3797200,RESOLUTION=480x360,CODECS="avc1.4d401f,mp4a.40.2"',
      'playlist-360p30.m3u8',
    ],
  });
};
