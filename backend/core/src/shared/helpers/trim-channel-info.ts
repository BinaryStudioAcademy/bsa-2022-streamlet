import { StreamStatus } from '../enums/enums';
import { ChannelInfoBeforeTrimming, ChannelInfoResponseDto } from '../types/types';

export const trimChannelInfo = (channel: ChannelInfoBeforeTrimming): ChannelInfoResponseDto => {
  return {
    authorInfo: {
      id: channel.author.id,
      username: channel.author.username,
      firstName: channel.author.profile?.firstName ?? '',
      lastName: channel.author.profile?.lastName ?? '',
    },
    initialVideosPage: {
      videos: channel.videos.map((video) => ({
        ...video,
        tags: video.tags.map((tag) => tag.name),
        status: video.status as StreamStatus,
        categories: video.categories.map((category) => category.name),
        createdAt: video.createdAt.toISOString(),
        updatedAt: video.updatedAt.toISOString(),
        durationSec: video.duration,
      })),
    },
    bannerImage: channel.bannerImage,
    avatar: channel.avatar,
    subscribersCount: channel._count.subscriptions,
    contactEmail: channel.contactEmail,
    description: channel.description,
    id: channel.id,
    createdAt: channel.createdAt.toISOString(),
    name: channel.name,
  };
};
