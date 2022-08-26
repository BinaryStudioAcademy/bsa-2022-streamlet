import { inject, injectable } from 'inversify';
import { ChannelInfoBeforeTrimming, CONTAINER_TYPES, CreateSubscriptionResponseDto } from '~/shared/types/types';
import { ChannelCrudRepository } from '../port/channel-crud-repository';

@injectable()
export class ChannelCrudService {
  constructor(@inject(CONTAINER_TYPES.ChannelCrudRepository) private channelRepository: ChannelCrudRepository) {}

  getChannelById({ id }: { id: string }): Promise<ChannelInfoBeforeTrimming | null> {
    return this.channelRepository.getChannelById(id);
  }
  async toggleSubscription(userId: string, channelId: string): Promise<CreateSubscriptionResponseDto | null> {
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
