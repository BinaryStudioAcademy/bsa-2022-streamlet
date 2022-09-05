import { ChannelSearchDataResponseDto, DataVideo } from '../types';

export type SearchDataResponseDto = {
  channels: ChannelSearchDataResponseDto;
  videos: DataVideo;
};
