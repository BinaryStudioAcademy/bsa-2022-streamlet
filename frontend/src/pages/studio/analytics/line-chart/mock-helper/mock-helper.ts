import dayjs from 'dayjs';
import { LineChartDataPeriod } from 'common/types/types';

export const getNewPeriods = (days: string, month = 0): LineChartDataPeriod[] => {
  const newPeriods: LineChartDataPeriod[] = [];
  for (let i = 1; i <= Number(days); i++) {
    const randomDays = Number(days) === 7 ? 7 : Number(days);
    const randomMonth = month === 0 ? Math.ceil(Math.random() * 12) : month;
    const day = Math.ceil(Math.random() * randomDays);
    const value = Math.ceil(Math.random() * 9000);
    // const minutes = Math.ceil(Math.random() * 9000);
    newPeriods.push({ date: new Date(2022, randomMonth, day).getTime(), value1: value });
  }
  return newPeriods.sort((a, b) => (a.date > b.date ? 1 : -1));
};

export const getMonthData = (data: LineChartDataPeriod[]): LineChartDataPeriod[] => {
  const months = new Set();
  const newData: LineChartDataPeriod[] = [];
  for (const i of data) {
    const date = new Date(i.date);
    if (!months.has(date.getMonth())) {
      months.add(date.getMonth());
      newData.push(i);
    }
  }
  return newData as LineChartDataPeriod[];
};

export const getPeriods = (days: string): LineChartDataPeriod[] => {
  switch (Number(days)) {
    case 7:
      return getNewPeriods(days, dayjs().month() + 1);
    case 30:
      return [...getNewPeriods('15', dayjs().month() - 1), ...getNewPeriods('15', dayjs().month())];

    case 90:
      return [
        ...getNewPeriods('15', dayjs().month() - 2),
        ...getNewPeriods('30', dayjs().month() - 1),
        ...getNewPeriods('30', dayjs().month()),
        ...getNewPeriods('15', dayjs().month() + 1),
      ];

    default:
      return getNewPeriods(days);
  }
};

export const getFormat = (days: number): string => (days === 7 ? 'day' : 'month');
export const getLength = (days: number): number => {
  if (days === 7) {
    return days - 1;
  }
  return days === 30 ? 2 : days === 90 ? 4 : 12;
};
