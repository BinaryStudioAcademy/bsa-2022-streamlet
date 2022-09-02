import dayjs from 'dayjs';

const isDateSameByDayMonthYear = (date1: Date, date2: Date): boolean => {
  const dayjsDate1 = dayjs(date1),
    dayJsDate2 = dayjs(date2);
  const isDaySame = dayjsDate1.day() === dayJsDate2.day();
  const isMonthSame = dayjsDate1.month() === dayJsDate2.month();
  const isYearSame = dayjsDate1.year() === dayJsDate2.year();

  return isDaySame && isMonthSame && isYearSame;
};

export { isDateSameByDayMonthYear };
