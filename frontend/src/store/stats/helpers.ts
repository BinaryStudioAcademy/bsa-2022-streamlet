import {
  ChannelStatsSubsChartDataResponse,
  ChannelStatsViewsChartDataResponse,
  ChannelStatsWatchTimeChartDataResponse,
  DateTruncFormat,
  LineChartData,
} from 'shared/build';

type PayloadChartData =
  | ChannelStatsViewsChartDataResponse
  | ChannelStatsWatchTimeChartDataResponse
  | ChannelStatsSubsChartDataResponse;

export const setStateChartData = (payloadData: PayloadChartData): LineChartData => {
  return {
    data: payloadData.data.map((d) => ({
      date: new Date(d.createDate).getTime(),
      ...('viewsCount' in d && { value1: d.viewsCount }),
      ...('watchTimeSum' in d && { value1: d.watchTimeSum }),
      ...('subsCount' in d && 'unsubsCount' in d && { value1: d.subsCount, value2: d.unsubsCount }),
    })),
    format: payloadData.format as DateTruncFormat,
    dataLength: payloadData.data.length,
  } as LineChartData;
};
