import { ENV } from 'common/enums/enums';
import { timeout } from 'helpers/helpers';

const PLAYER_CONNECTION_TRIES = 5;
const defaultSegment = {
  height: 720,
  fps: 30,
  segment: '00003',
};

export const checkIsPlaylistFull = async (url: string, tries = 1): Promise<boolean> => {
  const { height, fps, segment } = defaultSegment;
  const path = url.substring(0, url.lastIndexOf('/'));
  const segmentUrl = `${path}/segment-${height}p${fps}_${segment}.ts`;

  if (tries >= PLAYER_CONNECTION_TRIES) {
    return false;
  }

  try {
    await fetch(new URL(segmentUrl, ENV.VIDEO_FALLBACK_BASE_URL).toString());
    return true;
  } catch {
    await timeout(tries * 1000);
    return checkIsPlaylistFull(url, ++tries);
  }
};
