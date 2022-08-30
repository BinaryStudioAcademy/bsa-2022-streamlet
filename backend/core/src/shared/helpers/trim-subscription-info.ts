import { BaseSubscriptionResponseDto } from 'shared/build';
import { SubscribtionWithChannelBeforeTrim } from '../types/subscription/subscription-with-channel-before-trim';

export const trimSubscriptionInfo = (subscription: SubscribtionWithChannelBeforeTrim): BaseSubscriptionResponseDto => ({
  id: subscription.id,
  channel: {
    id: subscription.channel.id,
    avatar: subscription.channel.avatar,
    name: subscription.channel.name,
  },
});
