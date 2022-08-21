import styles from './styles.module.scss';
import { IconName } from '../../../common/enums/enums';
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
import { ReactComponent as BurgerMenu } from '../../../assets/img/burger-menu.svg';
import { ReactComponent as MainLogo } from '../../../assets/img/main-logo.svg';
import { ReactComponent as Bell } from '../../../assets/img/bell.svg';
import { ReactComponent as Settings } from '../../../assets/img/settings.svg';
import { ReactComponent as Moon } from '../../../assets/img/moon.svg';
import { ReactComponent as LogOut } from '../../../assets/img/logout.svg';
import { ReactComponent as Analystic } from '../../../assets/img/analytics.svg';
import { ReactComponent as Close } from '../../../assets/img/close.svg';
import { ReactComponent as Exclamation } from '../../../assets/img/exclamation.svg';
import { ReactComponent as Info } from '../../../assets/img/info.svg';
import { ReactComponent as Warning } from '../../../assets/img/warning.svg';
import { ReactComponent as Success } from '../../../assets/img/success.svg';
import { ReactComponent as SendMessage } from '../../../assets/img/send-message.svg';
import { ReactComponent as Emoji } from '../../../assets/img/emoji.svg';
import { ReactComponent as Sun } from '../../../assets/img/sun-solid.svg';

import clsx from 'clsx';

const getColor = (color: string): string => styles[`fill${color}`];

interface ISVGProps {
  color?: string;
  width?: string;
  height?: string;
}

interface IconProps {
  name: string;
  color: string;
  width: string;
  height: string;
  className?: string;
  onClick?: { (): void };
}

const defaultProps: ISVGProps = {
  color: '',
  width: '20',
  height: '20',
};

const Icon = ({ name, color, width, height, className, onClick }: IconProps): JSX.Element => {
  const commonProps = {
    className: clsx(getColor(color), className),
    width: width,
    height: height,
    onClick,
  };

  switch (name) {
    case IconName.ALARM: {
      return <Alarm {...commonProps} />;
    }

    case IconName.ARROW_DOWN: {
      return <ArrowDown {...commonProps} />;
    }

    case IconName.ARROW_UP: {
      return <ArrowUp {...commonProps} />;
    }

    case IconName.CAMERA: {
      return <Camera {...commonProps} />;
    }

    case IconName.COMPAS: {
      return <Compas {...commonProps} />;
    }

    case IconName.FILTER: {
      return <Filter {...commonProps} />;
    }

    case IconName.FOLLOW: {
      return <Follow {...commonProps} />;
    }

    case IconName.HISTORY: {
      return <History {...commonProps} />;
    }

    case IconName.HOME: {
      return <Home {...commonProps} />;
    }

    case IconName.PLAY: {
      return <Play {...commonProps} />;
    }

    case IconName.SEARCH: {
      return <Search {...commonProps} />;
    }

    case IconName.SIGNOUT: {
      return <Signout {...commonProps} />;
    }

    case IconName.SMILE: {
      return <Smile {...commonProps} />;
    }

    case IconName.WATCH: {
      return <Watch {...commonProps} />;
    }

    case IconName.BURGERMENU: {
      return <BurgerMenu {...commonProps} />;
    }

    case IconName.LOGOTIP: {
      return <MainLogo {...commonProps} />;
    }

    case IconName.BELL: {
      return <Bell {...commonProps} />;
    }

    case IconName.SETTINGS: {
      return <Settings {...commonProps} />;
    }

    case IconName.MOON: {
      return <Moon {...commonProps} />;
    }

    case IconName.LOGOUT: {
      return <LogOut {...commonProps} />;
    }

    case IconName.XMARK: {
      return <Xmark {...commonProps} />;
    }

    case IconName.CLOSE: {
      return <Close {...commonProps} />;
    }

    case IconName.EXCLAMATION:
      return <Exclamation {...commonProps} />;

    case IconName.INFO:
      return <Info {...commonProps} />;

    case IconName.WARNING:
      return <Warning {...commonProps} />;

    case IconName.SUCCESS:
      return <Success {...commonProps} />;

    case IconName.SENDMESSAGE: {
      return <SendMessage {...commonProps} />;
    }

    case IconName.EMOJI: {
      return <Emoji {...commonProps} />;
    }

    case IconName.ANALYTICS: {
      return <Analystic {...commonProps} />;
    }

    case IconName.SUN: {
      return <Sun {...commonProps} />;
    }

    default: {
      return <Timeago {...commonProps} />;
    }
  }
};

Icon.defaultProps = defaultProps;

export { Icon };
