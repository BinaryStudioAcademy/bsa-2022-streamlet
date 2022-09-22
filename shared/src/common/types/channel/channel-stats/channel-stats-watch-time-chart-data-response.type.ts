import { DateTruncFormat } from '~/common/enums/enums';

export type ChannelStatsWatchTimeChartDataResponse = {
  data: {
    watchTimeSum: number;
    createDate: string;
  }[];
  format: DateTruncFormat;
};
