import { inject, injectable } from 'inversify';
import { PrismaClient, Video } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { VideoRepository } from '~/core/video/port/video-repository';

@injectable()
export class VideoRepositoryAdapter implements VideoRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  searchByTags({ take, skip, tags }: { skip?: number; take?: number; tags: string[] }): Promise<Video[]> {
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
}
