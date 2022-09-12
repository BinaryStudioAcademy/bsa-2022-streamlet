import clsx from 'clsx';
import React, { FC } from 'react';
import { ControlButton } from '../control-button/control-button';
import { ReactComponent as FastForward } from 'assets/img/fast-forward.svg';
import styles from './styles.module.scss';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
};

const SyncBtn: FC<Props> = ({ className, videoContainer }) => {
  return (
    <ControlButton
      className={clsx(className, styles['sync-btn'])}
      onClick={(): void => {
        videoContainer.currentTime = videoContainer.duration;
      }}
    >
      <FastForward height={20} />
    </ControlButton>
  );
};

export { SyncBtn };
