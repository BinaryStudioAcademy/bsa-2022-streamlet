import React, { FC, useEffect, useState } from 'react';
import { ControlButton } from '../control-button/control-button';

import { ReactComponent as PlayIcon } from 'assets/img/play.svg';
import { ReactComponent as PauseIcon } from 'assets/img/pause.svg';

type Props = {
  videoContainer: HTMLVideoElement;
  onPauseChange?: (isPaused: boolean) => void;
  className?: string;
};

const PlayPauseButton: FC<Props> = ({ videoContainer, className, onPauseChange }) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const handleClick = (): void => {
    if (videoContainer.paused || videoContainer.ended) {
      videoContainer.play();
      onPauseChange && onPauseChange(false);
    } else {
      videoContainer.pause();
      onPauseChange && onPauseChange(true);
    }
  };

  useEffect(() => {
    const handlePause = (): void => {
      setIsPaused(true);
    };
    const handlePlay = (): void => {
      setIsPaused(false);
    };
    videoContainer.addEventListener('pause', handlePause);
    videoContainer.addEventListener('play', handlePlay);
    return () => {
      videoContainer.removeEventListener('pause', handlePause);
      videoContainer.removeEventListener('play', handlePlay);
    };
  }, []);

  return (
    <ControlButton onClick={handleClick} className={className}>
      {isPaused ? <PlayIcon height="100%" /> : <PauseIcon height="100%" />}
    </ControlButton>
  );
};

export { PlayPauseButton };
