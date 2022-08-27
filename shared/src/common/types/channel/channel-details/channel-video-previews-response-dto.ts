// this dto is used when we request a list of channel's videos on a channel page (Videos tab)
// thus should only contain data required to build a preview card

import { StreamStatus } from '~/common/enums/enums';

type ChannelVideoPreview = {
  id: string;
  name: string;
  description: string;
  status: StreamStatus;
  liveViews: number;
  videoViews: number;
  tags: string[];
  categories: string[];
  createdAt: string;
  updatedAt: string;
  poster: string;
  durationSec: number | null;
};

// when pagination is implemented
// might also include additional data, like totalCount, page etc.
export type ChannelVideoPreviewsPageDto = {
  videos: ChannelVideoPreview[];
};
