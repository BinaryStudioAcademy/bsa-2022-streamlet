import clsx from 'clsx';
import { DataStatus, LoaderSize } from 'common/enums/enums';
import { Button, Loader } from 'components/common/common';
import {
  DARK_THEME_BASE_COLOR,
  DARK_THEME_HIGHLIGHT_COLOR,
  LIGHT_THEME_BASE_COLOR,
  LIGHT_THEME_HIGHLIGHT_COLOR,
} from 'components/common/video-skeleton/video-skeleton.config';
import { useAppDispatch, useAppSelector, useWindowDimensions } from 'hooks/hooks';
import React, { FC, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SkeletonTheme } from 'react-loading-skeleton';
import { loadRecommendedVideos, setNumberOfLoadingVideo } from 'store/video-page/actions';
import { RecVideoCard } from './rec-video-card/rec-video-card';
import { RecVideoSkeleton } from './rec-video-skeleton/rec-video-skeleton';
import styles from './styles.module.scss';

interface BlockProps {
  videoId: string;
  className?: string;
}

const SMALL_SCREEN_SIZE_IN_PX = 992;
const STANDARD_HEIGHT_VIDEO_CARD = 105;

const LinksBlock: FC<BlockProps> = ({ className, videoId }) => {
  const { dataStatus, videos, numberOfGettingVideos, totalVideos } = useAppSelector((state) => ({
    dataStatus: state.videoPage.recommendedVideos.dataStatus,
    videos: state.videoPage.recommendedVideos.videos,
    totalVideos: state.videoPage.recommendedVideos.total,
    numberOfGettingVideos: state.videoPage.recommendedVideos.numbersOfGetVideos,
  }));
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (width < SMALL_SCREEN_SIZE_IN_PX) {
      setIsSmallScreen(true);
      return;
    }

    setIsSmallScreen(false);
  }, [width]);

  useEffect(() => {
    const mainPage = document.getElementById('main-content');

    if (!mainPage) throw new Error();

    if (width >= SMALL_SCREEN_SIZE_IN_PX) {
      dispatch(setNumberOfLoadingVideo(Math.floor(mainPage.scrollHeight / STANDARD_HEIGHT_VIDEO_CARD)));
      return;
    }

    dispatch(setNumberOfLoadingVideo(6));
  }, [isSmallScreen, dispatch, width, videoId]);

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

  const uploadVideos = (): void => {
    dispatch(loadRecommendedVideos(videoId));
  };

  const continueLoading = useMemo((): boolean => {
    return videos.length < totalVideos;
  }, [videos, totalVideos]);

  const numberSkeleton = useMemo(() => {
    if (!videos.length) {
      return numberOfGettingVideos;
    }

    if (totalVideos - videos.length >= numberOfGettingVideos) {
      return numberOfGettingVideos;
    }

    return totalVideos - videos.length;
  }, [totalVideos, videos, numberOfGettingVideos]);

  return (
    <>
      {!isSmallScreen && (
        <InfiniteScroll
          dataLength={videos.length}
          next={uploadVideos}
          scrollableTarget="main-content"
          scrollThreshold="20px"
          hasMore={continueLoading}
          loader={
            <div className={styles['loader-block']}>
              <Loader spinnerSize={LoaderSize.SM} />
            </div>
          }
        >
          <div className={clsx(styles['links-block'], className)}>
            <h2 className={styles['recommended-header']}>Recommended</h2>
            {dataStatus === DataStatus.PENDING && !videos.length && (
              <SkeletonTheme baseColor={colorForSkeleton.baseColor} highlightColor={colorForSkeleton.highlightColor}>
                {[...Array(numberOfGettingVideos).keys()].map((item, index) => {
                  return <RecVideoSkeleton key={index} />;
                })}
              </SkeletonTheme>
            )}
            <div className={styles['videos-list']}>
              {videos.map((video) => (
                <RecVideoCard key={video.id} video={video} />
              ))}
            </div>
            {dataStatus === DataStatus.PENDING && Boolean(totalVideos) && (
              <SkeletonTheme baseColor={colorForSkeleton.baseColor} highlightColor={colorForSkeleton.highlightColor}>
                {[...Array(numberSkeleton).keys()].map((item, index) => {
                  return <RecVideoSkeleton key={index} />;
                })}
              </SkeletonTheme>
            )}
          </div>
        </InfiniteScroll>
      )}
      {isSmallScreen && (
        <div className={clsx(styles['links-block'], className)}>
          <h2 className={styles['recommended-header']}>Recommended</h2>
          {dataStatus === DataStatus.PENDING && !videos.length && (
            <SkeletonTheme baseColor={colorForSkeleton.baseColor} highlightColor={colorForSkeleton.highlightColor}>
              {[...Array(numberOfGettingVideos).keys()].map((item, index) => {
                return <RecVideoSkeleton key={index} />;
              })}
            </SkeletonTheme>
          )}
          <div className={styles['videos-list']}>
            {videos.map((video) => (
              <RecVideoCard key={video.id} video={video} />
            ))}
          </div>
          {dataStatus === DataStatus.PENDING && Boolean(totalVideos) && (
            <SkeletonTheme baseColor={colorForSkeleton.baseColor} highlightColor={colorForSkeleton.highlightColor}>
              {[...Array(numberSkeleton).keys()].map((item, index) => {
                return <RecVideoSkeleton key={index} />;
              })}
            </SkeletonTheme>
          )}
          {totalVideos > videos.length && (
            <div className={styles['wrapper-for-upload-btn']}>
              <Button content="Load more videos" onClick={uploadVideos} className={styles['button-upload-videos']} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export { LinksBlock };
