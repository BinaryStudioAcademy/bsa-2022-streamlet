import React, { FC, useEffect, useRef } from 'react';
import styles from './styles.module.scss';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
};

const ProgressBar: FC<Props> = ({ videoContainer }) => {
  const progressBar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onTimeUpdate = (): void => {
      if (progressBar.current) {
        progressBar.current.style.width = `${(videoContainer.currentTime / videoContainer.duration) * 100}%`;
      }
    };
    videoContainer.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      videoContainer.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [videoContainer]);

  return (
    <div
      onClick={(e): void => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.pageX - rect.left) / e.currentTarget.offsetWidth;
        if (progressBar.current) {
          progressBar.current.style.width = `${pos * 100}%`;
        }
        videoContainer.currentTime = pos * videoContainer.duration;
      }}
      className={styles['progress-bar-wrapper']}
    >
      <div ref={progressBar} className={styles['progress-bar']}></div>
    </div>
  );
};

export { ProgressBar };
