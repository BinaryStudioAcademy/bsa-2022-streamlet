import React, { FC, useEffect, useState } from 'react';
import { ReactComponent as VolumeHighIcon } from 'assets/img/volume/volume-high.svg';
import { ReactComponent as VolumeLowIcon } from 'assets/img/volume/volume-low.svg';
import { ReactComponent as VolumeMutedIcon } from 'assets/img/volume/volume-muted.svg';
import { ControlButton } from '../../control-button/control-button';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
};

const MuteButton: FC<Props> = ({ videoContainer, className }) => {
  const [volume, setVolume] = useState(videoContainer.muted ? 0 : videoContainer.volume);
  const handleClick = (): void => {
    videoContainer.muted = !videoContainer.muted;
  };

  useEffect(() => {
    const handleVolumeChange = (): void => {
      setVolume(videoContainer.muted ? 0 : videoContainer.volume);
    };

    videoContainer.addEventListener('volumechange', handleVolumeChange);
    return () => {
      videoContainer.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [videoContainer]);

  return (
    <ControlButton onClick={handleClick} className={className}>
      {volume >= 0.5 && <VolumeHighIcon height="100%" />}
      {volume > 0 && volume < 0.5 && <VolumeLowIcon height="100%" />}
      {volume === 0 && <VolumeMutedIcon height="100%" />}
    </ControlButton>
  );
};

export { MuteButton };
