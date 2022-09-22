import { ChannelStatsDeviceChartDataResponse } from './channel-stats-device-chart-data-response.type';
import { ChannelStatsLanguageChartDataResponse } from './channel-stats-language-chart-data-response.type';
import { ChannelStatsSubsChartDataResponse } from './channel-stats-subs-chart-data-response.type';
import { ChannelStatsViewsChartDataResponse } from './channel-stats-views-chart-data-response.type';
import { ChannelStatsWatchTimeChartDataResponse } from './channel-stats-watch-time-chart-data-response.type';

export type ChannelStatsChartDataResponseDto = {
  views: ChannelStatsViewsChartDataResponse;
  watchTime: ChannelStatsWatchTimeChartDataResponse;
  subs: ChannelStatsSubsChartDataResponse;
  device: ChannelStatsDeviceChartDataResponse;
  language: ChannelStatsLanguageChartDataResponse;
};
