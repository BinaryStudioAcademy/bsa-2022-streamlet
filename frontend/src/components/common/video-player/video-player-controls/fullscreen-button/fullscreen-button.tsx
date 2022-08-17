import React, { FC } from 'react';

type Props = {
  videoContainerWrapper: HTMLElement;
  className?: string;
};

const FullScreenButton: FC<Props> = ({ videoContainerWrapper, className }) => {
  const handleClick = (): void => {
    if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    } else {
      videoContainerWrapper.requestFullscreen();
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      Fullscreen
    </button>
  );
};

export { FullScreenButton };
