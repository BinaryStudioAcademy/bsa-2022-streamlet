import { BaseVideoResponseDto } from '../../types';

type VideoResponseDto = Omit<BaseVideoResponseDto, 'channel'>;

export type ChannelVideoPreviewsPageDto = {
  list: VideoResponseDto[];
  total: number;
};
