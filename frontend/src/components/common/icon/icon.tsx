import styles from './styles.module.scss';
import { IconName } from '../../../common/enums/enums';
import { ReactComponent as Alarm } from '../../../assets/img/alarm.svg';
import { ReactComponent as Camera } from '../../../assets/img/camera.svg';
import { ReactComponent as Compas } from '../../../assets/img/compas.svg';
import { ReactComponent as Follow } from '../../../assets/img/follow.svg';
import { ReactComponent as History } from '../../../assets/img/history.svg';
import { ReactComponent as Home } from '../../../assets/img/home.svg';
import { ReactComponent as Search } from '../../../assets/img/search.svg';
import { ReactComponent as Signout } from '../../../assets/img/signout.svg';
import { ReactComponent as Smile } from '../../../assets/img/smile.svg';
import { ReactComponent as Timeago } from '../../../assets/img/timeago.svg';
import { ReactComponent as Watch } from '../../../assets/img/watch.svg';
import { ReactComponent as BurgerMenu } from '../../../assets/img/burger-menu.svg';
import { ReactComponent as MainLogo } from '../../../assets/img/main-logo.svg';
import { ReactComponent as Bell } from '../../../assets/img/bell.svg';
import { ReactComponent as Settings } from '../../../assets/img/settings.svg';
import { ReactComponent as Moon } from '../../../assets/img/moon.svg';
import { ReactComponent as LogOut } from '../../../assets/img/logout.svg';

const getColor = (color: string): string => styles[`fill${color}`];

interface ISVGProps {
  color?: string;
  width?: string;
  height?: string;
}

const defaultProps: ISVGProps = {
  color: '',
  width: '20',
  height: '20',
};

const Icon = ({
  name,
  color,
  width,
  height,
  className,
}: {
  name: string;
  color: string;
  width: string;
  height: string;
  className?: string;
}): JSX.Element => {
  switch (name) {
    case IconName.ALARM:
      return <Alarm className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.CAMERA:
      return <Camera className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.COMPAS:
      return <Compas className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.FOLLOW:
      return <Follow className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.HISTORY:
      return <History className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.HOME:
      return <Home className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.SEARCH:
      return <Search className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.SIGNOUT:
      return <Signout className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.SMILE:
      return <Smile className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.WATCH:
      return <Watch className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.BURGERMENU:
      return <BurgerMenu className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.LOGOTIP:
      return <MainLogo className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.BELL:
      return <Bell className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.SETTINGS:
      return <Settings className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.MOON:
      return <Moon className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    case IconName.LOGOUT:
      return <LogOut className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;

    default:
      return <Timeago className={getColor(color) + ` ${className}`} width={`${width}px`} height={`${height}px`} />;
  }
};

Icon.defaultProps = defaultProps;

export { Icon };
