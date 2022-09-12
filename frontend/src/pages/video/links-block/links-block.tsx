import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, useEffect, useState } from 'react';
import { getVideos } from 'store/videos/actions';
import { RecVideoCard } from './rec-video-card/rec-video-card';
import styles from './styles.module.scss';

interface BlockProps {
  videoId?: string;
  className?: string;
}

const SHOW_ALL_VIDEOS_AFTER_PX = 992;
const SMALL_SCREEN_VIDEOS_LIMIT = 10;

const LinksBlock: FC<BlockProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [windowWidth, setWindowWidth] = useState(document.body.clientWidth);

  useEffect(() => {
    const onPageResize = (): void => {
      setWindowWidth(document.body.clientWidth);
    };
    window.addEventListener('resize', onPageResize);
    return (): void => {
      window.removeEventListener('resize', onPageResize);
    };
  }, []);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  const videos = useAppSelector((state) => state.videos.data.list);

  return (
    <div className={clsx(styles['links-block'], className)}>
      <h2 className={styles['recommended-header']}>Recommended</h2>
      <div className={styles['videos-list']}>
        {videos
          .slice(0, windowWidth >= SHOW_ALL_VIDEOS_AFTER_PX ? undefined : SMALL_SCREEN_VIDEOS_LIMIT)
          .map((video) => (
            <RecVideoCard key={video.id} video={video} />
          ))}
      </div>
    </div>
  );
};

export { LinksBlock };
