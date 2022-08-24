import React, { FC, useEffect, useState } from 'react';
import { ControlButton } from '../control-button/control-button';

import { ReactComponent as PlayIcon } from 'assets/img/play-player.svg';
import { ReactComponent as PauseIcon } from 'assets/img/pause.svg';
import { toggleVideoPlay } from '../../helpers/toggle-video-play';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
};

const PlayPauseButton: FC<Props> = ({ videoContainer, className }) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const handleClick = (): void => {
    toggleVideoPlay(videoContainer);
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
  }, [videoContainer]);

  return (
    <ControlButton onClick={handleClick} className={className}>
      {isPaused ? <PlayIcon height="100%" /> : <PauseIcon height="100%" />}
    </ControlButton>
  );
};

export { PlayPauseButton };
