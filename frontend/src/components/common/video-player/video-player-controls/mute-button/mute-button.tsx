import React, { FC } from 'react';

type Props = {
  videoContainer: HTMLVideoElement;
};

const MuteButton: FC<Props> = ({ videoContainer }) => {
  const handleClick = (): void => {
    videoContainer.muted = !videoContainer.muted;
  };

  return (
    <button type="button" onClick={handleClick}>
      Mute/Unmute
    </button>
  );
};

export { MuteButton };
