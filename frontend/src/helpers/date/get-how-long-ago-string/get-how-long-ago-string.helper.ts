import dayjs from 'dayjs';

type timeUnitType = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute';
const timeUnitArray: timeUnitType[] = ['year', 'month', 'week', 'day', 'hour', 'minute'];

const getHowLongAgoString = (date: Date): string => {
  const inputDate = dayjs(date);
  const nowDate = dayjs();
  for (const timeUnit of timeUnitArray) {
    const different = nowDate.diff(inputDate, timeUnit);
    if (different > 0) {
      return `${different} ${timeUnit} ago`;
    }
  }
  return 'less than minute ago';
};

export { getHowLongAgoString };
