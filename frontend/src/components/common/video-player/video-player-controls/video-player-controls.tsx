import React, { FC, useRef } from 'react';
import { PlayPauseButton } from './play-pause-button/play-pause-button';

type Props = {
  videoContainer: HTMLVideoElement;
};

const VideoPlayerControls: FC<Props> = ({ videoContainer }) => {
  const progressBar = useRef<HTMLProgressElement | null>(null);
  const progressBarFallback = useRef<HTMLSpanElement | null>(null);
  const muteButton = useRef<HTMLButtonElement | null>(null);
  const volumeRangeInput = useRef<HTMLInputElement | null>(null);
  const fullScreenButton = useRef<HTMLButtonElement | null>(null);

  return (
    <ul>
      <li>
        <PlayPauseButton videoContainer={videoContainer} />
      </li>
      <li>
        <progress ref={progressBar} value={0} max={1}>
          <span ref={progressBarFallback}></span>
        </progress>
      </li>
      <li>
        <button ref={muteButton} type="button">
          Mute/Unmute
        </button>
      </li>
      <li>
        <input type="range" title="volume" min={0} max={1} step={0.05} value={1} ref={volumeRangeInput} />
      </li>
      <li>
        <button type="button" ref={fullScreenButton}>
          Fullscreen
        </button>
      </li>
    </ul>
  );
};

export { VideoPlayerControls };
