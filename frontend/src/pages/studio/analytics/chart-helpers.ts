import dayjs from 'dayjs';
import { StatsPeriodValue } from 'common/enums/enums';
import { DateTruncFormat } from 'shared/build';

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
