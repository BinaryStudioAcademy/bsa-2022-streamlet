import { ENV } from 'common/enums/enums';

const defaultSegment = {
  height: 720,
  fps: 30,
  segment: '00003',
};

export const checkIsPlaylistFull = async (url: string): Promise<boolean> => {
  const { height, fps, segment } = defaultSegment;
  const path = url.substring(0, url.lastIndexOf('/'));
  const segmentUrl = `${path}/segment-${height}p${fps}_${segment}.ts`;

  try {
    const response = await fetch(new URL(segmentUrl, ENV.VIDEO_FALLBACK_BASE_URL).toString());
    if (!response.ok) {
      throw Error();
    }
    return true;
  } catch {
    return false;
  }
};
