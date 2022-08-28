import dayjs from 'dayjs';

enum TimeUnitType {
  'year' = 'year',
  'month' = 'month',
  'week' = 'week',
  'day' = 'day',
  'hour' = 'hour',
  'minute' = 'minute',
}

enum TimeTitle {
  'year' = 'year',
  'month' = 'mon',
  'week' = 'week',
  'day' = 'day',
  'hour' = 'hour',
  'minute' = 'min',
}

const timeUnitArray = [
  TimeUnitType.year,
  TimeUnitType.month,
  TimeUnitType.week,
  TimeUnitType.day,
  TimeUnitType.hour,
  TimeUnitType.minute,
];

const matchTimeUnitWithTimeTitle: Record<TimeUnitType, TimeTitle> = {
  [TimeUnitType.year]: TimeTitle.year,
  [TimeUnitType.month]: TimeTitle.month,
  [TimeUnitType.week]: TimeTitle.week,
  [TimeUnitType.day]: TimeTitle.day,
  [TimeUnitType.hour]: TimeTitle.hour,
  [TimeUnitType.minute]: TimeTitle.minute,
};

const getHowLongAgoString = (date: Date): string => {
  const inputDate = dayjs(date);
  const nowDate = dayjs();

  const moreThanMinute = timeUnitArray.find((timeUnit) => nowDate.diff(inputDate, timeUnit) > 0);

  if (moreThanMinute) {
    return `${nowDate.diff(inputDate, moreThanMinute)} ${matchTimeUnitWithTimeTitle[moreThanMinute]}(s) ago`;
  }

  return 'less than a min ago';
};

export { getHowLongAgoString };
