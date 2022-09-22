import dayjs, { OpUnitType } from 'dayjs';
import { StatsPeriodValue } from 'common/enums/enums';
import { DateTruncFormat, LineChartDataPeriod } from 'shared/build';

export const getFormattedDate = (date: string, format: DateTruncFormat, period: StatsPeriodValue): string => {
  switch (format) {
    case DateTruncFormat.DAY: {
      if (period === StatsPeriodValue.LAST_30_DAYS) {
        return dayjs(date).format('dd DD');
      }
      return dayjs(date).format('ddd DD');
    }

    case DateTruncFormat.WEEK: {
      return dayjs(date).format('D MMM');
    }

    default: {
      return dayjs(date).format('MMM');
    }
  }
};

export const getDateBeforePeriod = (period: StatsPeriodValue): string => {
  const dateBeforePeriod = new Date();
  dateBeforePeriod.setDate(dateBeforePeriod.getDate() - Number(period));

  return dayjs(dateBeforePeriod).format('YYYY-MM-DD');
};

export const getDefaultPeriod = (period: StatsPeriodValue): DateTruncFormat => {
  const periodValue = Number(period);

  if (periodValue > 305) {
    return DateTruncFormat.MONTH;
  }

  if (periodValue > 45) {
    return DateTruncFormat.WEEK;
  }

  return DateTruncFormat.DAY;
};

export const matchDateTruncFormatWithDayJSDiffFormat: Record<DateTruncFormat, Exclude<OpUnitType, 'date' | 'dates'>> = {
  [DateTruncFormat.DAY]: 'day',
  [DateTruncFormat.WEEK]: 'week',
  [DateTruncFormat.MONTH]: 'month',
  [DateTruncFormat.YEAR]: 'year',
};

export const getEmptyPeriodsForChart = (period: StatsPeriodValue): LineChartDataPeriod[] => {
  const newPeriods: LineChartDataPeriod[] = [];
  const startDate = getDateBeforePeriod(period);
  const format = getDefaultPeriod(period);

  const dayJsDiffFormat = matchDateTruncFormatWithDayJSDiffFormat[format];

  const diffFormat = dayjs(new Date()).diff(startDate, dayJsDiffFormat);

  for (let i = 0; i < diffFormat; i++) {
    newPeriods.push({
      date: dayjs(startDate).add(i, dayJsDiffFormat).valueOf(),
      value1: 0,
    });
  }

  return newPeriods;
};
