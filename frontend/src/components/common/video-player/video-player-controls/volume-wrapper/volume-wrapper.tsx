import clsx from 'clsx';
import React, { FC } from 'react';
import { MuteButton } from './mute-button/mute-button';
import styles from './styles.module.scss';
import { VolumeInput } from './volume-input/volume-input';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
};

const VolumeWrapper: FC<Props> = ({ videoContainer, className }) => {
  return (
    <div className={clsx(styles['volume-wrapper'], className)}>
      <MuteButton videoContainer={videoContainer} />
      <VolumeInput videoContainer={videoContainer} className={styles['volume-slider']} />
    </div>
  );
};

export { VolumeWrapper };
