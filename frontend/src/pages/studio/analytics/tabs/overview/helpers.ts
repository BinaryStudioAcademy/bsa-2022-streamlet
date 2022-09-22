import { LineChartData } from 'shared/build';

export const secondsToHours = (s: number): number => {
  return Math.floor((s / (60 * 60)) * 100) / 100;
};

export const getSumOfChartDataValue1 = (data: LineChartData): number => {
  if (data.dataLength === 0) {
    return 0;
  }

  return data.data.reduce((p, c) => p + c.value1, 0);
};
