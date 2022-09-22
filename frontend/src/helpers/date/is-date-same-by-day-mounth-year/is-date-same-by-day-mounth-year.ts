import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

const isDateSameByDayMonthYear = (date1: Date, date2: Date): boolean => {
  const dayjsDate1 = dayjs(date1),
    dayJsDate2 = dayjs(date2);
  const isDaySame = dayjsDate1.day() === dayJsDate2.day();
  const isMonthSame = dayjsDate1.month() === dayJsDate2.month();
  const isYearSame = dayjsDate1.year() === dayJsDate2.year();

  return isDaySame && isMonthSame && isYearSame;
};

const prettyDate = (date: string): string => {
  const prettyDateValue = dayjs(date).fromNow(true);

  dayjs.extend(updateLocale);
  dayjs.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'Today',
      m: 'Today',
      mm: 'Today',
      h: 'Today',
      hh: 'Today',
      d: 'Yesterday',
      dd: '%d days ago',
      M: 'A month',
      MM: '%d months ago',
      y: 'a year',
      yy: '%d years',
    },
  });

  return prettyDateValue;
};

export { isDateSameByDayMonthYear, prettyDate };
