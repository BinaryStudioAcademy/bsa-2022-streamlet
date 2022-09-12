import { inject, injectable } from 'inversify';
import { PrismaClient, Prisma } from '@prisma/client';
import { ChannelSearch, ChannelSearchDataResponseDto, CONTAINER_TYPES } from '~/shared/types/types';
import { ChannelRepository } from '~/core/channel/port/channel-repository';
import { trimChannelSearch } from '~/shared/helpers';

@injectable()
export class ChannelRepositoryAdapter implements ChannelRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async getChannelsBySearch({ searchText, date, sortBy }: ChannelSearch): Promise<ChannelSearchDataResponseDto> {
    const queryOrderByObject = {
      orderBy: [
        ...sortBy.map((param) => param as Prisma.ChannelOrderByWithRelationAndSearchRelevanceInput),
        {
          _relevance: {
            fields: ['name'],
            search: searchText,
            sort: 'desc',
          } as Prisma.ChannelOrderByRelevanceInput,
        },
      ],
    };
    const queryObject = {
      where: {
        ...(searchText && {
          OR: [
            {
              name: {
                search: searchText,
              },
            },
            {
              description: {
                search: searchText,
              },
            },
          ],
        }),
        createdAt: {
          gte: date,
        },
      },
      include: {
        _count: {
          select: {
            subscriptions: true,
            videos: true,
          },
        },
      },
    };

    const result = await this.prismaClient.channel.findMany({
      ...queryObject,
      ...queryOrderByObject,
    });

    const total = result.length;
    const list = result.map(trimChannelSearch);

    return {
      list,
      total,
    };
  }

  async getFirstChannelBySearch({ searchText }: ChannelSearch): Promise<ChannelSearchDataResponseDto> {
    const queryObject = {
      where: {
        ...(searchText && {
          name: {
            search: searchText,
          },
        }),
      },
      include: {
        _count: {
          select: {
            subscriptions: true,
            videos: true,
          },
        },
      },
    };

    const result = await this.prismaClient.channel.findFirst({
      ...queryObject,
    });

    if (!result) {
      return {
        list: [],
        total: 0,
      };
    }

    return {
      list: [trimChannelSearch(result)],
      total: 1,
    };
  }
}
