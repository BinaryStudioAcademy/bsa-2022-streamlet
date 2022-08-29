import { Channel, Subscription } from '@prisma/client';

export interface ChannelSubscriptionRepository {
  addSubscription(channelId: string, videoId: string): Promise<{ isSubscribed: boolean } | null>;
  removeSubscription(userId: string, videoId: string): Promise<{ isSubscribed: boolean } | null>;
  isUserSubscribed(channelId: string, userId: string): Promise<boolean>;
  getUserSubscriptions(userId: string): Promise<{
    list: (Subscription & {
      channel: Channel;
    })[];
    total: number;
  }>;
}
