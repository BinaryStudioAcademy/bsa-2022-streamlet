import React, { FC } from 'react';
import { FullScreenButton } from './fullscreen-button/fullscreen-button';
import { MuteButton } from './mute-button/mute-button';
import { PlayPauseButton } from './play-pause-button/play-pause-button';
import { ProgressBar } from './progress-bar/progress-bar';
import { VolumeInput } from './volume-input/volume-input';

type Props = {
  videoContainer: HTMLVideoElement;
  videoContainerWrapper: HTMLElement;
};

const VideoPlayerControls: FC<Props> = ({ videoContainer, videoContainerWrapper }) => {
  return (
    <div>
      <PlayPauseButton videoContainer={videoContainer} />
      <ProgressBar videoContainer={videoContainer} />
      <MuteButton videoContainer={videoContainer} />
      <VolumeInput videoContainer={videoContainer} />
      {document.fullscreenEnabled && <FullScreenButton videoContainerWrapper={videoContainerWrapper} />}
    </div>
  );
};

export { VideoPlayerControls };
