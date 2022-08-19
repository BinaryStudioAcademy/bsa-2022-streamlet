import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES, CreateSubscriptionResponseDto } from '~/shared/types/types';
import { ChannelRepository } from '~/core/channel/port/channel-repository';

@injectable()
export class ChannelService {
  private channelRepository: ChannelRepository;
  constructor(@inject(CONTAINER_TYPES.ChannelRepository) channelRepository: ChannelRepository) {
    this.channelRepository = channelRepository;
  }
  async addSubscription(userId: string, channelId: string): Promise<CreateSubscriptionResponseDto | null> {
    const channel = this.channelRepository.getChannelById(channelId);
    if (!channel) {
      return null;
    }
    const isUserSubscribe = await this.channelRepository.isUserSubscribe(channelId, userId);
    if (isUserSubscribe) {
      return this.channelRepository.removeSubscription(userId, channelId);
    }
    return this.channelRepository.addSubscription(userId, channelId);
  }
}
