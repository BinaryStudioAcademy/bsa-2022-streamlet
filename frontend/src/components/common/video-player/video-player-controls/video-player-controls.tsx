import React, { FC, useEffect } from 'react';
import { FullScreenButton } from './fullscreen-button/fullscreen-button';
import { PlayPauseButton } from './play-pause-button/play-pause-button';
import { ProgressBar } from './progress-bar/progress-bar';
import { VolumeWrapper } from './volume-wrapper/volume-wrapper';

import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  videoContainer: HTMLVideoElement;
  videoContainerWrapper: HTMLElement;
  className?: string;
};

const VideoPlayerControls: FC<Props> = ({ videoContainer, videoContainerWrapper, className }) => {
  useEffect(() => {
    const handlePause = (): void => {
      videoContainerWrapper.dataset.paused = 'true';
    };
    const handlePlay = (): void => {
      videoContainerWrapper.dataset.paused = 'false';
    };
    videoContainer.addEventListener('pause', handlePause);
    videoContainer.addEventListener('play', handlePlay);
    return () => {
      videoContainer.removeEventListener('pause', handlePause);
      videoContainer.removeEventListener('play', handlePlay);
    };
  }, []);

  return (
    <div className={clsx(styles['video-controls-wrapper'], className)}>
      <PlayPauseButton videoContainer={videoContainer} />
      <VolumeWrapper videoContainer={videoContainer} />
      <ProgressBar videoContainer={videoContainer} className={styles['progress-bar']} />
      {document.fullscreenEnabled && <FullScreenButton videoContainerWrapper={videoContainerWrapper} />}
    </div>
  );
};

export { VideoPlayerControls };
