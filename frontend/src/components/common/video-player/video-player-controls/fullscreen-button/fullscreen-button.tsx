import React, { FC, useEffect, useState } from 'react';
import { ControlButton } from '../control-button/control-button';
import { ReactComponent as FullScreenOpenIcon } from 'assets/img/fullscreen-open.svg';
import { ReactComponent as FullScreenCloseIcon } from 'assets/img/fullscreen-close.svg';
import fscreen from 'fscreen';
import { enterFullScreen, exitFullScreen } from './helpers/fscreen';

type Props = {
  videoContainerWrapper: HTMLElement;
  videoContainer: HTMLVideoElement;
  className?: string;
};

const FullScreenButton: FC<Props> = ({ videoContainerWrapper, className, videoContainer }) => {
  const [isFullScreen, setIsFullScreen] = useState(fscreen.fullscreenElement ?? false);

  const handleClick = (): void => {
    if (isFullScreen) {
      exitFullScreen(videoContainer);
    } else {
      enterFullScreen(videoContainerWrapper, videoContainer);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = (): void => {
      setIsFullScreen(fscreen.fullscreenElement ?? false);
    };
    fscreen.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      fscreen.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <ControlButton onClick={handleClick} className={className}>
      {isFullScreen ? <FullScreenCloseIcon height="100%" /> : <FullScreenOpenIcon height="100%" />}
    </ControlButton>
  );
};

export { FullScreenButton };
