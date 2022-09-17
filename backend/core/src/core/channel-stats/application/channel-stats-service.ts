import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { ChannelStatsRepository } from '../port/channel-stats-repository';
import { CreateChannelStatRequestDto } from 'shared/build';

@injectable()
export class ChannelStatsService {
  constructor(@inject(CONTAINER_TYPES.ChannelStatsRepository) private channelStatsRepository: ChannelStatsRepository) {}

  async createChannelStat({
    userId,
    channelId,
    source,
    stats,
  }: {
    userId: string;
    channelId: string;
    source: string;
    stats: CreateChannelStatRequestDto['stats'];
  }): Promise<boolean> {
    const channelStat = await this.channelStatsRepository.createChannelStat({
      ...stats,
      userId,
      channelId,
      source,
    });

    return Boolean(channelStat);
  }
}
