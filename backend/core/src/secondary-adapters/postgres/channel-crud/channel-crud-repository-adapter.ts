import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ChannelCrudRepository } from '~/core/channel-crud/port/channel-crud-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelInfoBeforeTrimming } from '~/shared/types/types';

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
}
