export type dataPeriods = {
  date: Date;
  value: number;
  minutes?: number;
};

export type ChartData = {
  data: dataPeriods[];
  format: string;
  dataLength: number;
};
