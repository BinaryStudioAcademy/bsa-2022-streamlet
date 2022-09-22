import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { VideoStatsRepository } from '~/core/video-stats/port/video-stats-repository';

@injectable()
export class VideoStatsRepositoryAdapter implements VideoStatsRepository {
  constructor(@inject(CONTAINER_TYPES.PrismaClient) private prismaClient: PrismaClient) {}

  async createManyVideoStats({ data }: { data: Prisma.VideoStatsCreateManyInput[] }): Promise<boolean> {
    const videoStats = await this.prismaClient.videoStats.createMany({
      data: [...data],
    });
    return videoStats.count > 0;
  }
}
