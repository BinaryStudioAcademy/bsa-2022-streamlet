import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { CONTAINER_TYPES, CreateSubscriptionResponseDto } from '~/shared/types/types';
import { ChannelSubscriptionRepository } from '~/core/channel-subscription/port/channel-subscription-repository';

@injectable()
export class ChannelSubscriptionRepositoryAdapter implements ChannelSubscriptionRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
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

    return { isSubscribed: true };
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

    return { isSubscribed: false };
  }

  async isUserSubscribed(channelId: string, userId: string): Promise<boolean> {
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
