import dayjs from 'dayjs';
import * as dayjsDuration from 'dayjs/plugin/duration';

dayjs.extend(dayjsDuration.default);

const getFormatDurationString = (durationInSeconds: number): string => {
  const d = dayjs.duration(durationInSeconds * 1000);
  if (d.hours()) {
    return d.format('H:mm:ss');
  }
  return d.format('m:ss');
};

export { getFormatDurationString };
