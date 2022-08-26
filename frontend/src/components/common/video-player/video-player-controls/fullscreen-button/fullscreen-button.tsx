import React, { FC, useEffect, useState } from 'react';
import { ControlButton } from '../control-button/control-button';
import { ReactComponent as FullScreenOpenIcon } from 'assets/img/fullscreen-open.svg';
import { ReactComponent as FullScreenCloseIcon } from 'assets/img/fullscreen-close.svg';

type Props = {
  videoContainerWrapper: HTMLElement;
  className?: string;
};

const FullScreenButton: FC<Props> = ({ videoContainerWrapper, className }) => {
  const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement ?? false);
  const handleClick = (): void => {
    if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    } else {
      videoContainerWrapper.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = (): void => {
      setIsFullScreen(document.fullscreenElement ?? false);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <ControlButton onClick={handleClick} className={className}>
      {isFullScreen ? <FullScreenCloseIcon height="100%" /> : <FullScreenOpenIcon height="100%" />}
    </ControlButton>
  );
};

export { FullScreenButton };
