import { ChannelSearch, ChannelSearchDataResponseDto } from '~/shared/types/types';

export interface ChannelRepository {
  getChannelsBySearch(queryParams: ChannelSearch): Promise<ChannelSearchDataResponseDto>;
  getFirstChannelBySearch(queryParams: ChannelSearch): Promise<ChannelSearchDataResponseDto>;
}
