import { ChannelStats } from '@prisma/client';
import { CreateChannelStatDto } from 'shared/build';

export interface ChannelStatsRepository {
  createChannelStat(createChannelStatsData: CreateChannelStatDto): Promise<ChannelStats>;
}
