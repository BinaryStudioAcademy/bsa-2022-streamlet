import { Channel, Subscription } from '@prisma/client';

export type SubscribtionWithChannelBeforeTrim = Subscription & {
  channel: Channel;
};
