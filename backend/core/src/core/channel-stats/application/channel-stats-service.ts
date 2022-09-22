import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { ChannelStatsRepository } from '../port/channel-stats-repository';
import { CreateChannelStatRequestDto, ChannelStatsChartDataResponseDto, DateTruncFormat } from 'shared/build';

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

  async getChannelStats(
    channelId: string,
    dateFrom: string,
    format: DateTruncFormat,
  ): Promise<ChannelStatsChartDataResponseDto> {
    const channelViewsStats = await this.channelStatsRepository.getChannelStatsViews(channelId, dateFrom, format);
    const channelWatchTimeStats = await this.channelStatsRepository.getChannelStatsWatchTime(
      channelId,
      dateFrom,
      format,
    );
    const channelSubsStats = await this.channelStatsRepository.getChannelStatsSubs(channelId, dateFrom, format);
    const channelDeviceStats = await this.channelStatsRepository.getChannelStatsDevice(channelId, dateFrom);
    const channelLanguageStats = await this.channelStatsRepository.getChannelStatsLanguage(channelId, dateFrom);

    return {
      views: {
        data: channelViewsStats.map((cs) => ({
          ...cs,
          viewsCount: Number(cs.viewsCount),
        })),
        format,
      },
      watchTime: {
        data: channelWatchTimeStats.map((cs) => ({
          ...cs,
          watchTimeSum: Number(cs.watchTimeSum),
        })),
        format,
      },
      subs: {
        data: channelSubsStats.map((cs) => ({
          ...cs,
          subsCount: Number(cs.subsCount),
          unsubsCount: Number(cs.unsubsCount),
        })),
        format,
      },
      device: {
        mobileCount: Number(channelDeviceStats[0].mobileCount),
        tabletCount: Number(channelDeviceStats[0].tabletCount),
        desktopCount: Number(channelDeviceStats[0].desktopCount),
        unknownCount: Number(channelDeviceStats[0].unknownCount),
      },
      language: {
        data: channelLanguageStats.map((cs) => ({
          ...cs,
          languageCount: Number(cs.languageCount),
        })),
      },
    };
  }
}
