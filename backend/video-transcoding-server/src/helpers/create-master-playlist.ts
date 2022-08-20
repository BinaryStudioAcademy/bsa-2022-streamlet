import { FsService } from '~/services';
import { ProcessPreset } from '~/shared';
import { presetMatch } from './ffmpeg-preset-matcher';

export const createMasterPlaylist = (path: string, presets: ProcessPreset[]): void => {
  FsService.createFile({
    path,
    filename: 'master.m3u8',
    content: [
      '#EXTM3U',
      '#EXT-X-VERSION:3',
      ...presets
        .map((preset) => {
          const { width, height, fps } = presetMatch[preset];
          return [
            `#EXT-X-STREAM-INF:BANDWIDTH=3797200,RESOLUTION=${width}x${height},CODECS="avc1.4d4020,mp4a.40.2"`,
            `playlist-${height}p${fps}.m3u8`,
            '',
          ];
        })
        .flat(),
      // '#EXT-X-STREAM-INF:BANDWIDTH=3797200,RESOLUTION=1280x720,CODECS="avc1.4d4020,mp4a.40.2"',
      // 'playlist-720p30.m3u8',
      // '',
      // '#EXT-X-STREAM-INF:BANDWIDTH=3797200,RESOLUTION=852x480,CODECS="avc1.4d401f,mp4a.40.2"',
      // 'playlist-480p30.m3u8',
      // '',
      // '#EXT-X-STREAM-INF:BANDWIDTH=3797200,RESOLUTION=480x360,CODECS="avc1.4d401f,mp4a.40.2"',
      // 'playlist-360p30.m3u8',
    ],
  });
};
