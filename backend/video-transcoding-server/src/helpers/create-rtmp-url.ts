import { CONFIG } from '~/config/config';

export const createRtmpUrl = (streamKey: string): string =>
  `rtmp://${CONFIG.rtmpHost}:${CONFIG.rtmpPort}/live/${streamKey}`;
