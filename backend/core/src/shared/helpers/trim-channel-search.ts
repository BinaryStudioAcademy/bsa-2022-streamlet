import { Channel } from '@prisma/client';
import { ChannelInfoSearchDto } from '../types/types';

export const trimChannelSearch = (
  channel: Channel & {
    _count: {
      videos: number;
      subscriptions: number;
    };
  },
): ChannelInfoSearchDto => {
  return {
    id: channel.id,
    name: channel.name,
    description: channel.description,
    avatar: channel.avatar,
    subscribersCount: channel._count.subscriptions,
    videosCount: channel._count.videos,
    createdAt: channel.createdAt.toISOString(),
  };
};
