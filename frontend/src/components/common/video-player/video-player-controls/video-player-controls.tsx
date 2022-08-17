import React, { FC } from 'react';
import { FullScreenButton } from './fullscreen-button/fullscreen-button';
import { MuteButton } from './mute-button/mute-button';
import { PlayPauseButton } from './play-pause-button/play-pause-button';
import { ProgressBar } from './progress-bar/progress-bar';
import { VolumeInput } from './volume-input/volume-input';

import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  videoContainer: HTMLVideoElement;
  videoContainerWrapper: HTMLElement;
  className?: string;
};

const VideoPlayerControls: FC<Props> = ({ videoContainer, videoContainerWrapper, className }) => {
  return (
    <div className={clsx(styles['video-controls-wrapper'], className)}>
      <PlayPauseButton
        videoContainer={videoContainer}
        onPauseChange={(isPaused): void => {
          videoContainerWrapper.dataset.paused = String(isPaused);
        }}
      />
      <ProgressBar videoContainer={videoContainer} className={styles['progress-bar']} />
      <MuteButton videoContainer={videoContainer} />
      <VolumeInput videoContainer={videoContainer} />
      {document.fullscreenEnabled && <FullScreenButton videoContainerWrapper={videoContainerWrapper} />}
    </div>
  );
};

export { VideoPlayerControls };
