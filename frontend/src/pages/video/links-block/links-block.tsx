import clsx from 'clsx';
import { DataStatus } from 'common/enums/enums';
import {
  DARK_THEME_BASE_COLOR,
  DARK_THEME_HIGHLIGHT_COLOR,
  LIGHT_THEME_BASE_COLOR,
  LIGHT_THEME_HIGHLIGHT_COLOR,
} from 'components/common/video-skeleton/video-skeleton.config';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, useEffect, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { shallowEqual } from 'react-redux';
import { loadRecommendedVideos } from 'store/video-page/actions';
import { RecVideoCard } from './rec-video-card/rec-video-card';
import { RecVideoSkeleton } from './rec-video-skeleton/rec-video-skeleton';
import styles from './styles.module.scss';

interface BlockProps {
  videoId: string;
  className?: string;
}

const SHOW_ALL_VIDEOS_AFTER_PX = 992;
const SMALL_SCREEN_VIDEOS_LIMIT = 10;

const LOADING_SKELETONS_COUNT = 10;

const LinksBlock: FC<BlockProps> = ({ className, videoId }) => {
  const { dataStatus, videos } = useAppSelector((state) => state.videoPage.recommendedVideos, shallowEqual);
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
    if (dataStatus === DataStatus.IDLE) {
      dispatch(loadRecommendedVideos(videoId));
    }
  }, [dispatch, dataStatus, videoId]);

  const isLightTheme = useAppSelector((state) => state.theme.isLightTheme);

  const colorForSkeleton = {
    baseColor: isLightTheme ? LIGHT_THEME_BASE_COLOR : DARK_THEME_BASE_COLOR,
    highlightColor: isLightTheme ? LIGHT_THEME_HIGHLIGHT_COLOR : DARK_THEME_HIGHLIGHT_COLOR,
  };

  return (
    <div className={clsx(styles['links-block'], className)}>
      <h2 className={styles['recommended-header']}>Recommended</h2>
      {dataStatus === DataStatus.PENDING && (
        <SkeletonTheme baseColor={colorForSkeleton.baseColor} highlightColor={colorForSkeleton.highlightColor}>
          {[...Array(LOADING_SKELETONS_COUNT).keys()].map((item, index) => {
            return <RecVideoSkeleton key={index} />;
          })}
        </SkeletonTheme>
      )}
      {dataStatus === DataStatus.FULFILLED && (
        <div className={styles['videos-list']}>
          {videos
            .slice(0, windowWidth >= SHOW_ALL_VIDEOS_AFTER_PX ? undefined : SMALL_SCREEN_VIDEOS_LIMIT)
            .map((video) => (
              <RecVideoCard key={video.id} video={video} />
            ))}
        </div>
      )}
    </div>
  );
};

export { LinksBlock };
