import { ChannelStats } from '@prisma/client';
import { CreateChannelStatDto, DateTruncFormat } from 'shared/build';
import {
  ChannelStatsSubsChartData,
  ChannelStatsViewsChartData,
  ChannelStatsWatchTimeChartData,
  ChannelStatsDeviceChartData,
  ChannelStatsLanguageChartData,
} from '~/shared/types/types';

export interface ChannelStatsRepository {
  createChannelStat(createChannelStatsData: CreateChannelStatDto): Promise<ChannelStats>;
  getChannelStatsWatchTime(
    channelId: string,
    dateFrom: string,
    format: DateTruncFormat,
  ): Promise<ChannelStatsWatchTimeChartData>;
  getChannelStatsViews(
    channelId: string,
    dateFrom: string,
    format: DateTruncFormat,
  ): Promise<ChannelStatsViewsChartData>;
  getChannelStatsSubs(channelId: string, dateFrom: string, format: DateTruncFormat): Promise<ChannelStatsSubsChartData>;
  getChannelStatsDevice(channelId: string, dateFrom: string): Promise<ChannelStatsDeviceChartData>;
  getChannelStatsLanguage(channelId: string, dateFrom: string): Promise<ChannelStatsLanguageChartData>;
  getChannelStatWatchTimeAllTime(channelId: string): Promise<{ id: string; watchTime: number }>;
  getChannelStatViews(channelId: string): Promise<{ id: string; views: number }>;
}
