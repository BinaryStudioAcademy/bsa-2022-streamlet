import React, { FC, useEffect } from 'react';
import { FullScreenButton } from './fullscreen-button/fullscreen-button';
import { PlayPauseButton } from './play-pause-button/play-pause-button';
import { VolumeWrapper } from './volume-wrapper/volume-wrapper';

import styles from './styles.module.scss';
import clsx from 'clsx';
import { VideoTime } from './video-time/video-time';
import { ProgressBar } from './progress-bar/progress-bar';
import { SettingsControl } from './settings-control/settings-control';
import Hls from 'hls.js';
import { LiveIndicator } from './live-indicator/live-indicator';
import fscreen from 'fscreen';
import { SyncBtn } from './sync-btn/sync-btn';

type Props = {
  videoContainer: HTMLVideoElement;
  videoContainerWrapper: HTMLElement;
  hlsClient: Hls;
  isLive: boolean;
  isFullscreen: boolean;
  className?: string;
};

const VideoPlayerControls: FC<Props> = ({
  videoContainer,
  videoContainerWrapper,
  className,
  hlsClient,
  isLive,
  isFullscreen,
}) => {
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
  }, [videoContainer, videoContainerWrapper]);

  return (
    <div className={clsx(styles['video-elements-wrapper'], className, isFullscreen && styles['fullscreen'])}>
      <ProgressBar videoContainer={videoContainer} liveSyncLie={isLive} />
      <div className={styles['video-controls-wrapper']}>
        <PlayPauseButton videoContainer={videoContainer} />
        <VolumeWrapper videoContainer={videoContainer} />
        {isLive ? (
          <>
            <SyncBtn videoContainer={videoContainer} />
            <LiveIndicator className={styles['live-indicator']} />
          </>
        ) : (
          <VideoTime videoContainer={videoContainer} className={styles['video-time']} />
        )}
        <SettingsControl videoWrapper={videoContainerWrapper} videoContainer={videoContainer} hlsClient={hlsClient} />
        {fscreen.fullscreenEnabled && <FullScreenButton videoContainerWrapper={videoContainerWrapper} />}
      </div>
    </div>
  );
};

export { VideoPlayerControls };
