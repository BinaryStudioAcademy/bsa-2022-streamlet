import { Channel, Subscription } from '@prisma/client';
import { CreateSubscriptionResponseDto } from '~/shared/types/types';

export interface ChannelSubscriptionRepository {
  addSubscription(channelId: string, videoId: string): Promise<CreateSubscriptionResponseDto | null>;
  removeSubscription(userId: string, videoId: string): Promise<CreateSubscriptionResponseDto | null>;
  isUserSubscribed(channelId: string, userId: string): Promise<boolean>;
  getUserSubscriptions(userId: string): Promise<{
    list: (Subscription & {
      channel: Channel;
    })[];
    total: number;
  }>;
}
