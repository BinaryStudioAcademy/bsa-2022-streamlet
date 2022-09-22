import { LineChartData, LineChartDataPeriod } from 'shared/build';

export const secondsToHours = (s: number): number => {
  return Math.floor((s / (60 * 60)) * 100) / 100;
};

export const getSumOfChartDataValue = (data: LineChartData, key: keyof Omit<LineChartDataPeriod, 'date'>): number => {
  if (data.dataLength === 0) {
    return 0;
  }

  if (data.data[0][key] === undefined) {
    return 0;
  }

  return data.data.reduce((p, c) => p + (c[key] ?? 0), 0);
};
