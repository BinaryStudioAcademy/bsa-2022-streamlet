import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as PlayIcon } from 'assets/img/play-player.svg';
import { ReactComponent as PauseIcon } from 'assets/img/pause.svg';
import clsx from 'clsx';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
};

const PlayPauseCenterEffect: FC<Props> = ({ videoContainer, className }) => {
  const [isPaused, setIsPaused] = useState(videoContainer.paused);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handlePause = (): void => {
      setIsPaused(true);
    };
    const handlePlay = (): void => {
      setIsPaused(false);
    };
    videoContainer.addEventListener('pause', handlePause);
    videoContainer.addEventListener('play', handlePlay);
    return () => {
      videoContainer.removeEventListener('pause', handlePause);
      videoContainer.removeEventListener('play', handlePlay);
    };
  }, [videoContainer]);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const el = containerRef.current;
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = '';
  }, [isPaused]);

  return (
    <div className={clsx(className, styles['container'])} ref={containerRef}>
      {isPaused ? <PauseIcon height="100%" /> : <PlayIcon height="100%" />}
    </div>
  );
};

export { PlayPauseCenterEffect };
