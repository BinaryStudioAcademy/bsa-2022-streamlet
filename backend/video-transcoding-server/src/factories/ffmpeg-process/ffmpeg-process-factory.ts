import { FffmpegProcessCreatorDto } from '~/shared';
import Ffmpeg from 'fluent-ffmpeg';

export class FfmpegFactory {
  public static create({ videoId, input, width, height, fps }: FffmpegProcessCreatorDto): Ffmpeg.FfmpegCommand {
    Ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');
    return Ffmpeg(input)
      .addOption('-hide_banner')
      .addOption('-c:v', 'libx264')
      .addOption('-c:a', 'aac')
      .addOption('-s', `${width}:${height}`)
      .addOption('-b:a', '192k')
      .addOption('-b:v', '3260k')
      .addOption('-profile:v', 'main')
      .addOption('-preset', 'veryfast')
      .addOption('-r', `${fps}`)
      .addOption('-x264opts', `keyint=${fps * 2}:no-scenecut`)
      .addOption('-f', 'hls')
      .addOption('-hls_allow_cache', '1')
      .addOption('-hls_time', '2')
      .addOption('-map_metadata', '-1')
      .addOption('-map_chapters', '-1')
      .addOption('-hls_list_size', '0')
      .addOption('-hls_segment_filename', `playback/${videoId}/segment-${height}p${fps}_%05d.ts`)
      .output(`playback/${videoId}/playlist-${height}p${fps}.m3u8`);
  }
}
