import React, { FC, useEffect, useState } from 'react';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
};

const VolumeInput: FC<Props> = ({ videoContainer, className }) => {
  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    videoContainer.volume = volume;
  }, [volume]);

  return (
    <input
      type="range"
      title="volume"
      min={0}
      max={1}
      step={0.01}
      value={volume}
      onChange={(e): void => {
        setVolume(Number(e.target.value));
      }}
      className={className}
    />
  );
};

export { VolumeInput };
