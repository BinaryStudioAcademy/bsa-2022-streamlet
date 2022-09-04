import { inject, injectable } from 'inversify';
import { Channel, PrismaClient, Subscription } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { ChannelSubscriptionRepository } from '~/core/channel-subscription/port/channel-subscription-repository';

@injectable()
export class ChannelSubscriptionRepositoryAdapter implements ChannelSubscriptionRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async getUserSubscriptions(userId: string): Promise<{
    list: (Subscription & {
      channel: Channel;
    })[];
    total: number;
  }> {
    const subscriptions = await this.prismaClient.subscription.findMany({
      where: {
        userId,
      },
      include: {
        channel: true,
      },
    });
    return { list: subscriptions, total: subscriptions.length };
  }

  async addSubscription(userId: string, channelId: string): Promise<{ isSubscribed: boolean } | null> {
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

    return { isSubscribed: true };
  }
  async removeSubscription(userId: string, channelId: string): Promise<{ isSubscribed: boolean } | null> {
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

    return { isSubscribed: false };
  }

  async isUserSubscribed(channelId: string, userId: string): Promise<boolean> {
    const userSubscription = await this.prismaClient.channel.findFirst({
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
