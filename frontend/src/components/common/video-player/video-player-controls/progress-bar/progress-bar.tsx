import React from 'react';
import clsx from 'clsx';
import { FC } from 'common/types/types';
import { useEffect, useRef, useState, useAppDispatch } from 'hooks/hooks';
import { statsActions } from 'store/actions';
import { secondsToDisplay } from '../../helpers/seconds-to-display';
import styles from './styles.module.scss';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
  liveSyncLie: boolean;
};

// if current time is within 5s from live edge, snap the bar to the end
const LIVE_SYNC_LIE_SPAN_SEC = 5;

const ProgressBar: FC<Props> = ({ videoContainer, className, liveSyncLie }) => {
  const dispatch = useAppDispatch();
  const progressWrapper = useRef<HTMLDivElement | null>(null);
  const [previewTime, setPreviewTime] = useState(0);

  useEffect(() => {
    const onTimeUpdate = (): void => {
      if (progressWrapper.current) {
        let currentTime = videoContainer.currentTime;
        if (liveSyncLie) {
          currentTime += LIVE_SYNC_LIE_SPAN_SEC;
        }
        progressWrapper.current.style.setProperty(
          '--progress-position',
          Math.min(currentTime / videoContainer.duration, 1).toString(),
        );
      }
    };
    videoContainer.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      videoContainer.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [liveSyncLie, videoContainer]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
    if (progressWrapper.current) {
      progressWrapper.current.style.setProperty('--preview-position', percentage.toString());
    }
    setPreviewTime(Math.floor(videoContainer.duration * percentage));
  };

  return (
    <div
      onClick={(e): void => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.pageX - rect.left) / e.currentTarget.offsetWidth;
        if (progressWrapper.current) {
          progressWrapper.current.style.setProperty('--progress-position', pos.toString());
        }
        const currentTime = pos * videoContainer.duration;
        videoContainer.currentTime = currentTime;
        dispatch(statsActions.updatePlayerTime(Math.floor(currentTime)));
      }}
      className={clsx(styles['progress-bar-wrapper'], className)}
      ref={progressWrapper}
      onMouseMove={handleMouseMove}
    >
      <div className={styles['progress-bar']}>
        <div className={styles['preview-modal']}>{secondsToDisplay(previewTime)}</div>
        <div className={styles['thumb-indicator']}></div>
      </div>
    </div>
  );
};

export { ProgressBar };
