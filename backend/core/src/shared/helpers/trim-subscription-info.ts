import { Channel, Subscription } from '@prisma/client';
import { BaseSubscriptionResponseDto } from 'shared/build';

export const trimSubscriptionInfo = (
  subscription: Subscription & {
    channel: Channel;
  },
): BaseSubscriptionResponseDto => ({
  id: subscription.id,
  channel: {
    id: subscription.channel.id,
    avatar: subscription.channel.avatar,
    name: subscription.channel.name,
  },
});
