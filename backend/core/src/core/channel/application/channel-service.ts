import { inject, injectable } from 'inversify';
import { ChannelSearch, ChannelSearchDataResponseDto, CONTAINER_TYPES } from '~/shared/types/types';
import { ChannelRepository } from '../port/channel-repository';

@injectable()
export class ChannelService {
  constructor(@inject(CONTAINER_TYPES.ChannelRepository) private channelRepository: ChannelRepository) {}

  getChannelsBySearch(queryParams: ChannelSearch): Promise<ChannelSearchDataResponseDto> {
    return this.channelRepository.getChannelsBySearch(queryParams);
  }

  getFirstChannelBySearch(queryParams: ChannelSearch): Promise<ChannelSearchDataResponseDto> {
    return this.channelRepository.getChannelsBySearch(queryParams);
  }
}
