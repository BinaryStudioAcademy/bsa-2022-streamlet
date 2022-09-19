import styles from './styles.module.scss';
import { IconName } from 'common/enums/enums';
import { ReactComponent as ArrowDown } from 'assets/img/arrow-down.svg';
import { ReactComponent as ArrowDown2 } from 'assets/img/arrow-down-2.svg';
import { ReactComponent as Sun } from 'assets/img/sun-solid.svg';
import { ReactComponent as Alarm } from 'assets/img/alarm.svg';
import { ReactComponent as ArrowUp } from 'assets/img/arrow-up.svg';
import { ReactComponent as ArrowLeft } from 'assets/img/arrow-left.svg';
import { ReactComponent as BellOutline } from 'assets/img/bell-outline.svg';
import { ReactComponent as Camera } from 'assets/img/camera.svg';
import { ReactComponent as ChevronUp } from 'assets/img/chevron-up.svg';
import { ReactComponent as ChevronDown } from 'assets/img/chevron-down.svg';
import { ReactComponent as Circle } from 'assets/img/circle.svg';
import { ReactComponent as Compass } from 'assets/img/compass.svg';
import { ReactComponent as DotsMenu } from 'assets/img/ellipsis-vertical.svg';
import { ReactComponent as Filter } from 'assets/img/filter.svg';
import { ReactComponent as Follow } from 'assets/img/follow.svg';
import { ReactComponent as History } from 'assets/img/history.svg';
import { ReactComponent as Home } from 'assets/img/home.svg';
import { ReactComponent as Play } from 'assets/img/play.svg';
import { ReactComponent as Search } from 'assets/img/search.svg';
import { ReactComponent as Smile } from 'assets/img/smile.svg';
import { ReactComponent as Smile2 } from 'assets/img/smile-2.svg';
import { ReactComponent as TimeAgo } from 'assets/img/time-ago.svg';
import { ReactComponent as Watch } from 'assets/img/watch.svg';
import { ReactComponent as XMark } from 'assets/img/x-mark.svg';
import { ReactComponent as MarkAsRead } from 'assets/img/mark-as-read.svg';
import { ReactComponent as BurgerMenu } from 'assets/img/burger-menu.svg';
import { ReactComponent as MainLogo } from 'assets/img/main-logo.svg';
import { ReactComponent as Bell } from 'assets/img/bell.svg';
import { ReactComponent as Settings } from 'assets/img/settings.svg';
import { ReactComponent as Moon } from 'assets/img/moon.svg';
import { ReactComponent as SignOut } from 'assets/img/sign-out.svg';
import { ReactComponent as Analytics } from 'assets/img/analytics.svg';
import { ReactComponent as Close } from 'assets/img/close.svg';
import { ReactComponent as Exclamation } from 'assets/img/exclamation.svg';
import { ReactComponent as Info } from 'assets/img/info.svg';
import { ReactComponent as Warning } from 'assets/img/warning.svg';
import { ReactComponent as Success } from 'assets/img/success.svg';
import { ReactComponent as SendMessage } from 'assets/img/send-message.svg';
import { ReactComponent as Emoji } from 'assets/img/emoji.svg';
import { ReactComponent as OnlineStreaming } from 'assets/img/online-streaming.svg';
import { ReactComponent as OnlineStreaming2 } from 'assets/img/online-streaming-2.svg';
import { ReactComponent as TV } from 'assets/img/tv.svg';
import { ReactComponent as Rotate } from 'assets/img/rotate.svg';
import { ReactComponent as Profile } from 'assets/img/profile.svg';
import { ReactComponent as Participants } from 'assets/img/users-between-lines.svg';
import { ReactComponent as OpenOutside } from 'assets/img/up-right-from-square.svg';
import { ReactComponent as TimeStamp } from 'assets/img/clock-rotate-left.svg';
import { ReactComponent as PenEdit } from 'assets/img/edit.svg';
import { ReactComponent as Trash } from 'assets/img/trash.svg';
import { ReactComponent as ReportFlag } from 'assets/img/report.svg';
import { ReactComponent as HorizontalScrollRightArrow } from 'assets/img/horizontal-scroll-right-arrow.svg';
import { ReactComponent as HorizontalScrollLeftArrow } from 'assets/img/horizontal-scroll-left-arrow.svg';
import { ReactComponent as Content } from 'assets/img/content.svg';
import { ReactComponent as Download } from 'assets/img/download.svg';

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

    case IconName.ARROW_DOWN_2: {
      return <ArrowDown2 {...commonProps} />;
    }

    case IconName.ARROW_UP: {
      return <ArrowUp {...commonProps} />;
    }

    case IconName.ARROW_LEFT: {
      return <ArrowLeft {...commonProps} />;
    }

    case IconName.CAMERA: {
      return <Camera {...commonProps} />;
    }

    case IconName.CHEVRON_UP: {
      return <ChevronUp {...commonProps} />;
    }

    case IconName.CHEVRON_DOWN: {
      return <ChevronDown {...commonProps} />;
    }

    case IconName.CIRCLE: {
      return <Circle {...commonProps} />;
    }

    case IconName.COMPASS: {
      return <Compass {...commonProps} />;
    }

    case IconName.DOTS_MENU: {
      return <DotsMenu {...commonProps} />;
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

    case IconName.SIGN_OUT: {
      return <SignOut {...commonProps} />;
    }

    case IconName.SMILE: {
      return <Smile {...commonProps} />;
    }

    case IconName.SMILE_2: {
      return <Smile2 {...commonProps} />;
    }

    case IconName.WATCH: {
      return <Watch {...commonProps} />;
    }

    case IconName.BURGER_MENU: {
      return <BurgerMenu {...commonProps} />;
    }

    case IconName.MAIN_LOGO: {
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

    case IconName.X_MARK: {
      return <XMark {...commonProps} />;
    }

    case IconName.CLOSE: {
      return <Close {...commonProps} />;
    }

    case IconName.EXCLAMATION: {
      return <Exclamation {...commonProps} />;
    }

    case IconName.INFO: {
      return <Info {...commonProps} />;
    }

    case IconName.WARNING: {
      return <Warning {...commonProps} />;
    }

    case IconName.SUCCESS: {
      return <Success {...commonProps} />;
    }

    case IconName.SEND_MESSAGE: {
      return <SendMessage {...commonProps} />;
    }

    case IconName.EMOJI: {
      return <Emoji {...commonProps} />;
    }

    case IconName.SUN: {
      return <Sun {...commonProps} />;
    }

    case IconName.ROTATE: {
      return <Rotate {...commonProps} />;
    }

    case IconName.ANALYTICS: {
      return <Analytics {...commonProps} />;
    }

    case IconName.MARK_AS_READ: {
      return <MarkAsRead {...commonProps} />;
    }

    case IconName.TV: {
      return <TV {...commonProps} />;
    }

    case IconName.ONLINE_STREAMING: {
      return <OnlineStreaming {...commonProps} />;
    }

    case IconName.ONLINE_STREAMING_2: {
      return <OnlineStreaming2 {...commonProps} />;
    }

    case IconName.BELL_OUTLINE: {
      return <BellOutline {...commonProps} />;
    }

    case IconName.PROFILE: {
      return <Profile {...commonProps} />;
    }

    case IconName.PARTICIPANTS: {
      return <Participants {...commonProps} />;
    }

    case IconName.TIMESTAMP: {
      return <TimeStamp {...commonProps} />;
    }

    case IconName.OPEN_OUTSIDE: {
      return <OpenOutside {...commonProps} />;
    }

    case IconName.EDIT: {
      return <PenEdit {...commonProps} />;
    }

    case IconName.DELETE: {
      return <Trash {...commonProps} />;
    }

    case IconName.REPORT: {
      return <ReportFlag {...commonProps} />;
    }

    case IconName.HORIZONTAL_SCROLL_LEFT_ARROW: {
      return <HorizontalScrollLeftArrow {...commonProps} />;
    }

    case IconName.HORIZONTAL_SCROLL_RIGHT_ARROW: {
      return <HorizontalScrollRightArrow {...commonProps} />;
    }

    case IconName.CONTENT: {
      return <Content {...commonProps} />;
    }

    case IconName.DOWNLOAD: {
      return <Download {...commonProps} />;
    }

    default: {
      return <TimeAgo {...commonProps} />;
    }
  }
};

Icon.defaultProps = defaultProps;

export { Icon };
