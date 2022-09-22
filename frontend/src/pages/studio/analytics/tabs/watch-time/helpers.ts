import { LineChartData } from 'shared/build';

const secondsToHours = (s: number): number => {
  return Math.floor((s / (60 * 60)) * 100) / 100;
};

const getWatchTimeDataInHours = (data: LineChartData): LineChartData => {
  const { data: chartData } = data;

  if (chartData.length === 0) {
    return data;
  }

  const dataKeys = (Object.keys(chartData[0]) as Array<keyof typeof chartData[0]>).filter((k) => k !== 'date');

  const transformedData = chartData.map((d) => ({
    ...d,
    ...dataKeys.reduce(
      (prev, cur) => ({
        ...prev,
        [cur]: secondsToHours(d[cur] ?? 0),
      }),
      {},
    ),
  }));

  return {
    ...data,
    data: transformedData,
  };
};

export { getWatchTimeDataInHours };
