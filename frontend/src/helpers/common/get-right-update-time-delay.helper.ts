import dayjs from 'dayjs';
import * as dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import { ComponentUpdateDelayTime } from 'common/enums/enums';

dayjs.extend(dayjsRelativeTime.default);

const getRightUpdateTimeDelay = (date: string): number => {
  const timeDiff = dayjs().diff(dayjs(date));

  if (timeDiff < ComponentUpdateDelayTime.FIVE_MINUTES) {
    return ComponentUpdateDelayTime.ONE_MINUTE;
  }
  if (timeDiff < ComponentUpdateDelayTime.HALF_HOUR) {
    return ComponentUpdateDelayTime.FIVE_MINUTES;
  }
  if (timeDiff < ComponentUpdateDelayTime.ONE_HOUR) {
    return ComponentUpdateDelayTime.HALF_HOUR;
  }
  return ComponentUpdateDelayTime.ONE_HOUR;
};

export { getRightUpdateTimeDelay };
