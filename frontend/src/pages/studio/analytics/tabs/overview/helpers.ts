import { ChannelStatsLanguageChartDataResponse, LineChartData, LineChartDataPeriod } from 'shared/build';
import { defaultLangs, LANG_DATA_LIMIT } from './config';

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

export const addDefaultToActualLangData = (
  data: ChannelStatsLanguageChartDataResponse['data'],
): ChannelStatsLanguageChartDataResponse['data'] => {
  if (data.length >= LANG_DATA_LIMIT) {
    return data;
  }

  const newData = [...data];

  for (const lg of defaultLangs) {
    if (newData.length >= LANG_DATA_LIMIT) {
      return newData;
    }

    if (newData.every((d) => d.language !== lg)) {
      newData.push({
        language: lg,
        languageCount: 0,
      });
    }
  }

  return newData;
};
