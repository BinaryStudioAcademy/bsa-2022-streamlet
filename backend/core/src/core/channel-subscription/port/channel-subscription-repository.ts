import { SubscriptionListBeforeTrimming } from '~/shared/types/types';

export interface ChannelSubscriptionRepository {
  addSubscription(channelId: string, videoId: string): Promise<{ isSubscribed: boolean } | null>;
  removeSubscription(userId: string, videoId: string): Promise<{ isSubscribed: boolean } | null>;
  isUserSubscribed(channelId: string, userId: string): Promise<boolean>;
  getUserSubscriptions(userId: string): Promise<SubscriptionListBeforeTrimming>;
}
