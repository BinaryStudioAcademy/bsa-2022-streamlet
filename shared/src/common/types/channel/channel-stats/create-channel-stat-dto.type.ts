import { ChannelSubscriptionStatus } from '~/common/enums/enums';

type CreateChannelStatDto = {
  channelId: string;
  userId: string;
  source: string;
  subscription: ChannelSubscriptionStatus;
  createdAt?: string;
};

export { type CreateChannelStatDto };
