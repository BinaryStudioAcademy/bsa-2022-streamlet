import { inject, injectable } from 'inversify';
import { Channel, PrismaClient, StreamingKey, Video } from '@prisma/client';
import { CONTAINER_TYPES, CreateSubscriptionResponseDto } from '~/shared/types/types';
import { ChannelRepository } from '~/core/channel/port/channel-repository';

@injectable()
export class ChannelRepositoryAdapter implements ChannelRepository {
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
          createMany: {
            data: {
              userId,
            },
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

  getChannelById(id: string): Promise<Channel | null> {
    return this.prismaClient.channel.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
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

  getVideo(props: Partial<Video>): Promise<Video | null> {
    return this.prismaClient.video.findFirst({
      where: {
        ...props,
      },
    });
  }

  getStreamingKey(props: Partial<StreamingKey>): Promise<StreamingKey | null> {
    return this.prismaClient.streamingKey.findFirst({
      where: {
        ...props,
      },
    });
  }

  updateStreamingKey(channelId: string, key: string): Promise<StreamingKey | null> {
    return this.prismaClient.streamingKey.update({
      where: {
        channelId,
      },
      data: {
        key,
      },
    });
  }
}
