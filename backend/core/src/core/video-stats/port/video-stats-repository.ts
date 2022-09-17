import { Prisma } from '@prisma/client';

export interface VideoStatsRepository {
  createManyVideoStats(createVideoStatsData: { data: Prisma.VideoStatsCreateManyInput[] }): Promise<boolean>;
}
