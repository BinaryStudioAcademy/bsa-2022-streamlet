import { Prisma, PrismaClient, ChannelStats } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelStatsRepository } from '~/core/channel-stats/port/channel-stats-repository';
import { CreateChannelStatDto } from 'shared/build';

@injectable()
export class ChannelStatsRepositoryAdapter implements ChannelStatsRepository {
  constructor(@inject(CONTAINER_TYPES.PrismaClient) private prismaClient: PrismaClient) {}

  async createChannelStat({
    channelId,
    userId,
    subscription,
    source,
    createdAt,
  }: CreateChannelStatDto): Promise<ChannelStats> {
    const channelStats = await this.prismaClient.channelStats.create({
      data: {
        channelId,
        userId,
        subscription,
        source,
        createdAt,
      } as Prisma.ChannelStatsUncheckedCreateInput,
    });
    return channelStats;
  }
}
