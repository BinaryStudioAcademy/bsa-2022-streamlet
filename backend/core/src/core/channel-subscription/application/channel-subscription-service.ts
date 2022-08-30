import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES, CreateSubscriptionResponseDto } from '~/shared/types/types';
import { ChannelSubscriptionRepository } from '~/core/channel-subscription/port/channel-subscription-repository';
import { ChannelCrudRepository } from '~/core/channel-crud/port/channel-crud-repository';

@injectable()
export class ChannelSubscriptionService {
  private channelSubscriptionRepository: ChannelSubscriptionRepository;

  constructor(
    @inject(CONTAINER_TYPES.ChannelSubscriptionRepository) channelSubscriptionRepository: ChannelSubscriptionRepository,
    @inject(CONTAINER_TYPES.ChannelCrudRepository) private channelCrudRepository: ChannelCrudRepository,
  ) {
    this.channelSubscriptionRepository = channelSubscriptionRepository;
  }
  async toggleSubscription(userId: string, channelId: string): Promise<CreateSubscriptionResponseDto | null> {
    const channel = this.channelCrudRepository.getChannelById(channelId);
    if (!channel) {
      return null;
    }
    const isUserSubscribed = await this.channelSubscriptionRepository.isUserSubscribed(channelId, userId);
    if (isUserSubscribed) {
      return this.channelSubscriptionRepository.removeSubscription(userId, channelId);
    }
    return this.channelSubscriptionRepository.addSubscription(userId, channelId);
  }
}
