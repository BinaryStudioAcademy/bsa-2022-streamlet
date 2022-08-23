import dayjs from 'dayjs';
import * as dayjsDuration from 'dayjs/plugin/duration';

dayjs.extend(dayjsDuration.default);

const getFormatDurationString = (durationInSeconds: number): string => {
  const d = dayjs.duration(durationInSeconds * 1000);
  if (d.hours() > 9) {
    return d.format('HH:mm:ss');
  }
  if (d.hours()) {
    return d.format('H:mm:ss');
  }
  if (d.minutes() > 9) {
    return d.format('mm:ss');
  }
  return d.format('m:ss');
};

export { getFormatDurationString };
