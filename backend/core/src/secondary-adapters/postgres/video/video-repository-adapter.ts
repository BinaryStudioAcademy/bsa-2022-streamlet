import { inject, injectable } from 'inversify';
import { PrismaClient, Video } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { CategorySearchRequestQueryDto, TagSearchRequestQueryDto } from 'shared/build';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { VideoRepository } from '~/core/video/port/video-repository';

@injectable()
export class VideoRepositoryAdapter implements VideoRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getById(id: string): Promise<Video | null> {
    return this.prismaClient.video.findFirst({
      where: {
        id,
      },
    });
  }

  searchByTags({ take, skip, tags }: TagSearchRequestQueryDto): Promise<Video[]> {
    return this.prismaClient.video.findMany({
      where: {
        tags: {
          some: {
            name: {
              in: tags,
            },
          },
        },
      },
      take,
      skip,
    });
  }

  searchByCatergories({ skip, take, categories }: CategorySearchRequestQueryDto): Promise<Video[]> {
    return this.prismaClient.video.findMany({
      where: {
        categories: {
          some: {
            name: {
              in: categories,
            },
          },
        },
      },
      take,
      skip,
    });
  }
  async getAll(): Promise<DataVideo> {
    const items = await this.prismaClient.video.findMany({
      include: {
        channel: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    const total = items.length;
    const list = items.map(
      ({ id, poster, scheduledStreamDate, status, name, publishedAt, duration, videoViews, liveViews, channel }) => ({
        id,
        poster,
        scheduledStreamDate: scheduledStreamDate.toString(),
        status,
        name,
        publishedAt: publishedAt.toString(),
        duration,
        videoViews,
        liveViews,
        channel,
      }),
    );

    return {
      list,
      total,
    };
  }
}
