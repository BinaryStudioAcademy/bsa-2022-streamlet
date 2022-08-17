import React, { FC } from 'react';

type Props = {
  videoContainerWrapper: HTMLElement;
};

const FullScreenButton: FC<Props> = ({ videoContainerWrapper }) => {
  const handleClick = (): void => {
    if (document.fullscreenElement !== null) {
      // The document is in fullscreen mode
      document.exitFullscreen();
      //setFullscreenData(false);
    } else {
      // The document is not in fullscreen mode
      videoContainerWrapper.requestFullscreen();
      //setFullscreenData(true);
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      Fullscreen
    </button>
  );
};

export { FullScreenButton };
