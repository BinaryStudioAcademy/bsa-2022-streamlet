// this dto is used when we request a list of channel's videos on a channel page (Videos tab)
// thus should only contain data required to build a preview card

import { StreamingStatus } from '~/common/enums/enums';

type ChannelVideoPreview = {
  id: string;
  name: string;
  description: string;
  status: StreamingStatus;
  liveViews: number;
  videoViews: number;
  tags: string[];
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type ChannelVideoPreviewsResponseDto = {
  videos: ChannelVideoPreview[];
};
