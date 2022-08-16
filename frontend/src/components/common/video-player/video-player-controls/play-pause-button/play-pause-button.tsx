import React, { FC } from 'react';

type Props = {
  videoContainer: HTMLVideoElement;
};

const PlayPauseButton: FC<Props> = ({ videoContainer }) => {
  const handleClick = (): void => {
    if (videoContainer.paused) {
      videoContainer.play();
    } else {
      videoContainer.pause();
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      Play/Pause
    </button>
  );
};

export { PlayPauseButton };
