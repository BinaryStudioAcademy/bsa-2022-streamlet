import { ChannelInfoBeforeTrimming, CreateSubscriptionResponseDto } from '~/shared/types/types';

export interface ChannelCrudRepository {
  getChannelById(id: string): Promise<ChannelInfoBeforeTrimming | null>;
  addSubscription(channelId: string, videoId: string): Promise<CreateSubscriptionResponseDto | null>;
  removeSubscription(userId: string, videoId: string): Promise<CreateSubscriptionResponseDto | null>;
  isUserSubscribe(channelId: string, userId: string): Promise<boolean>;
  isUserSubscribeByVideoId(videoId: string, userId: string): Promise<boolean>;
}
