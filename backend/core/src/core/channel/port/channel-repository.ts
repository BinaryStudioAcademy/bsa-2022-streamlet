import { CreateSubscriptionResponseDto } from '../../../shared/types/types';
import { Channel } from '@prisma/client';

export interface ChannelRepository {
  addSubscription(channelId: string, videoId: string): Promise<CreateSubscriptionResponseDto | null>;
  removeSubscription(userId: string, videoId: string): Promise<CreateSubscriptionResponseDto | null>;
  getChannelById(id: string): Promise<Channel | null>;
  isUserSubscribe(channelId: string, userId: string): Promise<boolean>;
}
