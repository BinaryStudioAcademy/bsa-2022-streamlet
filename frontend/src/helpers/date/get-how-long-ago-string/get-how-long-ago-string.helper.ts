import dayjs from 'dayjs';

type timeUnitType = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute';
const timeUnitArray: timeUnitType[] = ['year', 'month', 'week', 'day', 'hour', 'minute'];

const getHowLongAgoString = (date: Date): string => {
  const inputDate = dayjs(date);
  const nowDate = dayjs();

  const moreThanMinute = timeUnitArray.find((timeUnit) => nowDate.diff(inputDate, timeUnit) > 0);

  if (moreThanMinute) {
    return `${nowDate.diff(inputDate, moreThanMinute)} ${moreThanMinute}(s) ago`;
  }

  return 'less than minute ago';
};

export { getHowLongAgoString };
