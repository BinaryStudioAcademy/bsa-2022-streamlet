import { DateTruncFormat } from '~/common/enums/enums';

export type ChannelStatsViewsChartDataResponse = {
  data: {
    viewsCount: number;
    createDate: string;
  }[];
  format: DateTruncFormat;
};
