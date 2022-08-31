import { Channel } from '@prisma/client';
import { ChannelSubscriptionResponseDto } from 'shared/build';

export const trimChannelToSubscriptionChannel = (channel: Channel): ChannelSubscriptionResponseDto => ({
  id: channel.id,
  channelAvatar: channel.avatar,
  title: channel.name,
});
