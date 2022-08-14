import styles from './styles.module.scss';
import { IconName, IconColor } from '../../../common/enums/enums';
import { ReactComponent as Alarm } from '../../../assets/img/alarm.svg';
import { ReactComponent as ArrowDown } from '../../../assets/img/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../../assets/img/arrow-up.svg';
import { ReactComponent as Camera } from '../../../assets/img/camera.svg';
import { ReactComponent as Compas } from '../../../assets/img/compas.svg';
import { ReactComponent as Filter } from '../../../assets/img/filter.svg';
import { ReactComponent as Follow } from '../../../assets/img/follow.svg';
import { ReactComponent as History } from '../../../assets/img/history.svg';
import { ReactComponent as Home } from '../../../assets/img/home.svg';
import { ReactComponent as Play } from '../../../assets/img/play.svg';
import { ReactComponent as Search } from '../../../assets/img/search.svg';
import { ReactComponent as Signout } from '../../../assets/img/signout.svg';
import { ReactComponent as Smile } from '../../../assets/img/smile.svg';
import { ReactComponent as Timeago } from '../../../assets/img/timeago.svg';
import { ReactComponent as Watch } from '../../../assets/img/watch.svg';
import { ReactComponent as Xmark } from '../../../assets/img/xmark.svg';

const getColor = (color: string): string => styles[`fill${color}`];

interface ISVGProps {
  color?: string;
  size?: string;
}

const defaultProps: ISVGProps = {
  color: IconColor.WHITE,
  size: '20',
};

const Icon = ({ name, color, size }: { name: string; color: string; size: string }): JSX.Element => {
  switch (name) {
    case IconName.ALARM:
      return <Alarm className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.ARROW_DOWN:
      return <ArrowDown className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.ARROW_UP:
      return <ArrowUp className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.CAMERA:
      return <Camera className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.COMPAS:
      return <Compas className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.FILTER:
      return <Filter className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.FOLLOW:
      return <Follow className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.HISTORY:
      return <History className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.HOME:
      return <Home className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.PLAY:
      return <Play className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.SEARCH:
      return <Search className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.SIGNOUT:
      return <Signout className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.SMILE:
      return <Smile className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.WATCH:
      return <Watch className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    case IconName.XMARK:
      return <Xmark className={getColor(color)} width={`${size}px`} height={`${size}px`} />;

    default:
      return <Timeago className={getColor(color)} width={`${size}px`} height={`${size}px`} />;
  }
};

Icon.defaultProps = defaultProps;

export { Icon };
