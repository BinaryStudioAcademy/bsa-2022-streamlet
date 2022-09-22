import { Prisma, PrismaClient, ChannelStats } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelStatsRepository } from '~/core/channel-stats/port/channel-stats-repository';
import { ChannelSubscriptionStatus, CreateChannelStatDto, VideoDeviceCategory, DateTruncFormat } from 'shared/build';
import {
  ChannelStatsWatchTimeChartData,
  ChannelStatsViewsChartData,
  ChannelStatsSubsChartData,
  ChannelStatsDeviceChartData,
  ChannelStatsLanguageChartData,
} from '~/shared/types/types';

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

  async getChannelStatsWatchTime(
    channelId: string,
    dateFrom: string,
    format: DateTruncFormat,
  ): Promise<ChannelStatsWatchTimeChartData> {
    const watchTimeStats = await this.prismaClient.$queryRaw<ChannelStatsWatchTimeChartData>`
      SELECT 
        SUM(vs."watchTime") AS "watchTimeSum", 
        TO_CHAR(DATE_TRUNC(${format}, vs."createdAt"), 'YYYY-MM-DD') AS "createDate"
      FROM "VideoStats" vs
      INNER JOIN "Video" v ON vs."videoId" = v.id
      WHERE vs."createdAt" >= ${dateFrom}::TIMESTAMP AND v."channelId" = ${channelId}
      GROUP BY "createDate"
      ORDER BY "createDate" ASC;
    `;

    return watchTimeStats;
  }

  async getChannelStatsViews(
    channelId: string,
    dateFrom: string,
    format: DateTruncFormat,
  ): Promise<ChannelStatsViewsChartData> {
    const viewsStats = await this.prismaClient.$queryRaw<ChannelStatsViewsChartData>`
      SELECT
        COUNT(vs."view") AS "viewsCount", 
        TO_CHAR(DATE_TRUNC(${format}, vs."createdAt"), 'YYYY-MM-DD') AS "createDate"
      FROM "VideoStats" vs
      INNER JOIN "Video" v ON vs."videoId" = v.id
      WHERE vs."createdAt" >= ${dateFrom}::TIMESTAMP AND v."channelId" = ${channelId} AND vs."view" = true
      GROUP BY "createDate"
      ORDER BY "createDate" ASC;
    `;

    return viewsStats;
  }

  async getChannelStatsSubs(
    channelId: string,
    dateFrom: string,
    format: DateTruncFormat,
  ): Promise<ChannelStatsSubsChartData> {
    const subsStats = await this.prismaClient.$queryRaw<ChannelStatsSubsChartData>`
      SELECT
        SUM(CASE WHEN cs."subscription"::text = ${ChannelSubscriptionStatus.SUBSCRIBED} THEN 1 ELSE 0 END) AS "subsCount", 
        SUM(CASE WHEN cs."subscription"::text = ${ChannelSubscriptionStatus.UNSUBSCRIBED} THEN 1 ELSE 0 END) AS "unsubsCount",
        TO_CHAR(DATE_TRUNC(${format}, cs."createdAt"), 'YYYY-MM-DD') AS "createDate"
      FROM "ChannelStats" cs
      WHERE cs."createdAt" >= ${dateFrom}::TIMESTAMP AND cs."channelId" = ${channelId}
      GROUP BY "createDate"
      ORDER BY "createDate" ASC;
    `;

    return subsStats;
  }

  async getChannelStatsDevice(channelId: string, dateFrom: string): Promise<ChannelStatsDeviceChartData> {
    const deviceStats = await this.prismaClient.$queryRaw<ChannelStatsDeviceChartData>`
      SELECT
        SUM(CASE WHEN vs."device"::text = ${VideoDeviceCategory.MOBILE} THEN 1 ELSE 0 END) AS "mobileCount", 
        SUM(CASE WHEN vs."device"::text = ${VideoDeviceCategory.TABLET} THEN 1 ELSE 0 END) AS "tabletCount",
        SUM(CASE WHEN vs."device"::text = ${VideoDeviceCategory.DESKTOP} THEN 1 ELSE 0 END) AS "desktopCount",
        SUM(CASE WHEN vs."device"::text = ${VideoDeviceCategory.UNKNOWN} THEN 1 ELSE 0 END) AS "unknownCount"
      FROM "VideoStats" vs
      INNER JOIN "Video" v ON vs."videoId" = v.id
      WHERE vs."createdAt" >= ${dateFrom}::TIMESTAMP AND v."channelId" = ${channelId};
    `;

    return deviceStats;
  }

  async getChannelStatsLanguage(channelId: string, dateFrom: string): Promise<ChannelStatsLanguageChartData> {
    const langStats = await this.prismaClient.$queryRaw<ChannelStatsLanguageChartData>`
      SELECT vs."language", COUNT(vs."language") AS "languageCount"
      FROM "VideoStats" vs
      INNER JOIN "Video" v ON vs."videoId" = v.id
      WHERE vs."createdAt" >= ${dateFrom}::TIMESTAMP AND v."channelId" = ${channelId}
      GROUP BY vs."language"
      ORDER BY "languageCount" DESC;
    `;

    return langStats;
  }
}
