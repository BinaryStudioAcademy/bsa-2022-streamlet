import { Channel, PrismaClient, User } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ChannelProfileUpdateDto, ChannelProfileUpdateMediaDto } from 'shared/build';
import { ChannelCrudRepository } from '~/core/channel-crud/port/channel-crud-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelInfoBeforeTrimming } from '~/shared/types/types';

@injectable()
export class ChannelCrudRepositoryAdapter implements ChannelCrudRepository {
  constructor(@inject(CONTAINER_TYPES.PrismaClient) private prismaClient: PrismaClient) {}

  updateAvatar({ id, url }: ChannelProfileUpdateMediaDto): Promise<Channel> {
    return this.prismaClient.channel.update({
      where: {
        id,
      },
      data: {
        avatar: url,
      },
    });
  }
  updateBanner({ id, url }: ChannelProfileUpdateMediaDto): Promise<Channel> {
    return this.prismaClient.channel.update({
      where: {
        id,
      },
      data: {
        bannerImage: url,
      },
    });
  }
  updateSettings({ id, name, description }: ChannelProfileUpdateDto): Promise<Channel> {
    return this.prismaClient.channel.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
  }

  createDefaultForUser(user: User, channelName: string): Promise<Channel> {
    return this.prismaClient.channel.create({
      data: {
        name: channelName,
        authorId: user.id,
        contactEmail: user.email,
      },
    });
  }

  async getChannelByAuthorId(authorId: string): Promise<Channel | null> {
    return this.prismaClient.channel.findFirst({
      where: {
        authorId,
      },
    });
  }

  async getChannelById(id: string): Promise<ChannelInfoBeforeTrimming | null> {
    return this.prismaClient.channel.findFirst({
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
}
