import { faHouse, faCompass, faClock } from '@fortawesome/free-solid-svg-icons';
import { IconName } from 'common/enums/enums';

const iconNameToSvgIcon = {
  [IconName.HOUSE]: faHouse,
  [IconName.COMPASS]: faCompass,
  [IconName.CLOCK]: faClock,
};

export { iconNameToSvgIcon };
