import { inject, injectable } from 'inversify';
import { PrismaClient, Video } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { VideoRepository } from '~/core/video/port/video-repository';
import { CategorySearchRequestQueryDto, TagSearchRequestQueryDto } from 'shared/build';

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
}
