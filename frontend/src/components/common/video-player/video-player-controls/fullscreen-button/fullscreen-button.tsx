import React, { FC, useEffect, useState } from 'react';
import { ControlButton } from '../control-button/control-button';
import { ReactComponent as FullScreenOpenIcon } from 'assets/img/fullscreen-open.svg';
import { ReactComponent as FullScreenCloseIcon } from 'assets/img/fullscreen-close.svg';
import fscreen from 'fscreen';

type Props = {
  videoContainerWrapper: HTMLElement;
  className?: string;
};

const FullScreenButton: FC<Props> = ({ videoContainerWrapper, className }) => {
  const [isFullScreen, setIsFullScreen] = useState(fscreen.fullscreenElement ?? false);
  const handleClick = (): void => {
    if (fscreen.fullscreenElement !== null) {
      fscreen.exitFullscreen();
    } else {
      fscreen.requestFullscreen(videoContainerWrapper);
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
