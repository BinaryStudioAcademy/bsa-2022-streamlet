import { DateTruncFormat } from '~/common/enums/enums';

export type ChannelStatsSubsChartDataResponse = {
  data: {
    subsCount: number;
    unsubsCount: number;
    createDate: string;
  }[];
  format: DateTruncFormat;
};
