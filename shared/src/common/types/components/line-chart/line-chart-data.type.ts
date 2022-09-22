import { DateTruncFormat } from '~/common/enums/enums';
import { LineChartDataPeriod } from './line-chart-data-period.type';

export type LineChartData = {
  data: LineChartDataPeriod[];
  format: DateTruncFormat;
  dataLength: number;
};
