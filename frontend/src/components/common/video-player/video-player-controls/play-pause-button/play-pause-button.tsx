import React, { FC } from 'react';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
};

const PlayPauseButton: FC<Props> = ({ videoContainer, className }) => {
  const handleClick = (): void => {
    if (videoContainer.paused || videoContainer.ended) {
      videoContainer.play();
    } else {
      videoContainer.pause();
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      Play/Pause
    </button>
  );
};

export { PlayPauseButton };
