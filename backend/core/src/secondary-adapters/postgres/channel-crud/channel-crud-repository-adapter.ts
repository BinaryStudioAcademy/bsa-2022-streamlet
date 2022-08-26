import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ChannelCrudRepository } from '~/core/channel-crud/port/channel-crud-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelInfoBeforeTrimming, CreateSubscriptionResponseDto } from '~/shared/types/types';

@injectable()
export class ChannelCrudRepositoryAdapter implements ChannelCrudRepository {
  constructor(@inject(CONTAINER_TYPES.PrismaClient) private prismaClient: PrismaClient) {}

  async getChannelById(id: string): Promise<ChannelInfoBeforeTrimming | null> {
    return this.prismaClient.channel.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        // when pagination is implemented will only return n first results for preview
        // other pages will hit a separate endpoint
        videos: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            tags: true,
            categories: true,
          },
        },
        _count: {
          select: {
            subscriptions: true,
          },
        },
      },
    });
  }

  async addSubscription(userId: string, channelId: string): Promise<CreateSubscriptionResponseDto | null> {
    await this.prismaClient.channel.update({
      where: {
        id: channelId,
      },
      data: {
        subscriptions: {
          create: {
            userId,
          },
        },
      },
      select: {
        subscriptions: {
          where: { userId },
        },
      },
    });

    return { isSubscribe: true };
  }

  async removeSubscription(userId: string, channelId: string): Promise<CreateSubscriptionResponseDto | null> {
    await this.prismaClient.channel.update({
      where: {
        id: channelId,
      },
      data: {
        subscriptions: {
          deleteMany: [{ userId }],
        },
      },
      select: {
        subscriptions: {
          where: { userId },
        },
      },
    });

    return { isSubscribe: false };
  }

  async isUserSubscribe(channelId: string, userId: string): Promise<boolean> {
    const userSubscription = await this.prismaClient.channel.findUnique({
      where: {
        id: channelId,
      },
      select: {
        subscriptions: {
          where: {
            userId,
          },
        },
      },
    });
    return !!userSubscription?.subscriptions.length;
  }

  async isUserSubscribeByVideoId(videoId: string, userId: string): Promise<boolean> {
    const { channelId } = await this.prismaClient.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
      select: {
        channelId: true,
      },
    });
    const userSubscription = await this.prismaClient.channel.findUnique({
      where: {
        id: channelId,
      },
      select: {
        subscriptions: {
          where: {
            userId,
          },
        },
      },
    });
    return !!userSubscription?.subscriptions.length;
  }
}
