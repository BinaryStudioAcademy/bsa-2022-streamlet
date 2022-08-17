import React, { FC } from 'react';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
};

const MuteButton: FC<Props> = ({ videoContainer, className }) => {
  const handleClick = (): void => {
    videoContainer.muted = !videoContainer.muted;
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      Mute/Unmute
    </button>
  );
};

export { MuteButton };
