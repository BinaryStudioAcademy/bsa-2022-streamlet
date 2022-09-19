import React, { FC, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as PlayIcon } from 'assets/img/play-player.svg';
import { ReactComponent as PauseIcon } from 'assets/img/pause.svg';
import clsx from 'clsx';

type Props = {
  videoContainer: HTMLVideoElement;
  className?: string;
};

const PlayPauseCenterEffect: FC<Props> = ({ videoContainer, className }) => {
  const firstUpdate = useRef(true);
  const [isPaused, setIsPaused] = useState(videoContainer.paused);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleToggle = (): void => {
      firstUpdate.current = false;
      setIsPaused((wasPaused) => !wasPaused);
    };
    videoContainer.addEventListener('click', handleToggle);
    return () => {
      videoContainer.removeEventListener('click', handleToggle);
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

  const displayComponent: ReactNode = firstUpdate.current ? null : (
    <div className={clsx(className, styles['container'])} ref={containerRef}>
      {isPaused ? <PauseIcon height="100%" /> : <PlayIcon height="100%" />}
    </div>
  );
  return displayComponent;
};

export { PlayPauseCenterEffect };
