import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { secondsToDisplay } from '../../helpers/seconds-to-display';
import styles from './styles.module.scss';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
};

const VideoTime: FC<Props> = ({ videoContainer, className }) => {
  const [passedTime, setPassedTime] = useState(videoContainer.currentTime);
  const [totalTime, setTotalTime] = useState(videoContainer.duration);

  useEffect(() => {
    const onTimeUpdate = (): void => {
      setPassedTime(Math.floor(videoContainer.currentTime));
    };
    const onDurationChange = (): void => {
      setTotalTime(Math.floor(videoContainer.duration));
    };
    videoContainer.addEventListener('timeupdate', onTimeUpdate);
    videoContainer.addEventListener('durationchange', onDurationChange);
    return () => {
      videoContainer.removeEventListener('timeupdate', onTimeUpdate);
      videoContainer.removeEventListener('durationchange', onDurationChange);
    };
  }, [videoContainer]);

  return (
    <div className={clsx(className, styles['time-container'])}>
      {Number.isNaN(passedTime) ? '--:--' : secondsToDisplay(passedTime)}&nbsp;/&nbsp;
      {Number.isNaN(totalTime) ? '--:--' : secondsToDisplay(totalTime)}
    </div>
  );
};

export { VideoTime };
