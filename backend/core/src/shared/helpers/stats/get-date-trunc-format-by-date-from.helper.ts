import { DateTruncFormat } from 'shared/build';

const getDateTruncFormatByDateFrom = (dateFrom: Date): DateTruncFormat => {
  const now = new Date();
  const diffDays = Math.ceil(Math.abs(now.getTime() - dateFrom.getTime()) / (24 * 60 * 60 * 1000));

  if (diffDays >= 450) {
    return DateTruncFormat.MONTH;
  }

  if (diffDays >= 70) {
    return DateTruncFormat.WEEK;
  }

  return DateTruncFormat.DAY;
};

export { getDateTruncFormatByDateFrom };
