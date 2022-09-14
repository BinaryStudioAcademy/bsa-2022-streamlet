import { FC } from 'common/types/types';
import { VideoSkeleton } from '../video-skeleton/video-skeleton';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { DataStatus, LoaderSize } from 'common/enums/enums';
import {
  DARK_THEME_BASE_COLOR,
  DARK_THEME_HIGHLIGHT_COLOR,
  LIGHT_THEME_BASE_COLOR,
  LIGHT_THEME_HIGHLIGHT_COLOR,
} from '../video-skeleton/video-skeleton.config';

import styles from './videos-block.module.scss';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getRecommendedVideos } from 'store/videos/actions';
import { Loader } from '../common';
import { middleWidthOfVideoCard } from './videos.config';
export interface VideoBlockProps {
  blockTitle?: string;
  videoCards: ReactNode[];
  isGeneralBlock?: boolean;
  loadingStatus: DataStatus;
  isLazyBlock?: boolean;
  widthContent?: number;
}

const VideosBlock: FC<VideoBlockProps> = ({ blockTitle, videoCards, isLazyBlock, widthContent, isGeneralBlock }) => {
  const dispatch = useAppDispatch();
  const {
    isLightTheme,
    numberOfVideoForUpload,
    numberOfRecommendedVideos,
    totalNumberOfRecommendedVideos,
    uploadVideosStatus,
    totalGeneralVideos,
  } = useAppSelector((state) => ({
    isLightTheme: state.theme.isLightTheme,
    numberOfVideoForUpload: state.videos.data.recommendedVideos.numbersOfGetVideos,
    numberOfRecommendedVideos: state.videos.data.recommendedVideos.list.length,
    totalNumberOfRecommendedVideos: state.videos.data.recommendedVideos.total,
    totalGeneralVideos: state.videos.data.generalVideos.list.length,
    uploadVideosStatus: state.videos.data.recommendedVideos.status,
  }));
  const [numberOfVideosForGeneralBlock, setNumberOfVideosForGeneralBlock] = useState(4);

  const numberSkeleton = useMemo(() => {
    if (!numberOfRecommendedVideos) {
      return numberOfVideoForUpload;
    }

    if (totalNumberOfRecommendedVideos - numberOfRecommendedVideos >= numberOfVideoForUpload) {
      return numberOfVideoForUpload;
    }

    return totalNumberOfRecommendedVideos - numberOfRecommendedVideos;
  }, [numberOfRecommendedVideos, totalNumberOfRecommendedVideos, numberOfVideoForUpload]);

  useEffect(() => {
    if (widthContent) {
      setNumberOfVideosForGeneralBlock(Math.floor(widthContent / middleWidthOfVideoCard));
    }
  }, [widthContent]);

  const colorForSkeleton = {
    baseColor: isLightTheme ? LIGHT_THEME_BASE_COLOR : DARK_THEME_BASE_COLOR,
    highlightColor: isLightTheme ? LIGHT_THEME_HIGHLIGHT_COLOR : DARK_THEME_HIGHLIGHT_COLOR,
  };

  const uploadVideos = (): void => {
    dispatch(getRecommendedVideos());
  };

  const returnEmptyArrayForSkeleton = (value: number): Array<null> => {
    if (value <= 0) {
      return [];
    }

    return Array(value).fill(null);
  };

  const convertValueToBoolean = (param: string | number): boolean => {
    return Boolean(param);
  };

  const continueLoading = useMemo((): boolean => {
    return numberOfRecommendedVideos < totalNumberOfRecommendedVideos;
  }, [numberOfRecommendedVideos, totalNumberOfRecommendedVideos]);

  return (
    <div className={styles['separate-video-block']}>
      {blockTitle && (
        <div className={styles['wrapper-for-title']}>
          <h2 className={styles['video-block-title']}>{blockTitle}</h2>
        </div>
      )}
      {isLazyBlock && (
        <InfiniteScroll
          dataLength={videoCards.length}
          next={uploadVideos}
          scrollableTarget="main-content"
          hasMore={continueLoading}
          loader={
            <div className={styles['loader-block']}>
              <Loader spinnerSize={LoaderSize.XS} />
            </div>
          }
        >
          <SkeletonTheme baseColor={colorForSkeleton.baseColor} highlightColor={colorForSkeleton.highlightColor}>
            <div className={styles['videos-block']}>
              {isLazyBlock && convertValueToBoolean(numberOfRecommendedVideos) && videoCards}
              {(!convertValueToBoolean(numberOfRecommendedVideos) || uploadVideosStatus === DataStatus.PENDING) &&
                returnEmptyArrayForSkeleton(numberSkeleton).map((_, index) => <VideoSkeleton key={index} />)}
            </div>
          </SkeletonTheme>
        </InfiniteScroll>
      )}
      {!isLazyBlock && isGeneralBlock && (
        <SkeletonTheme baseColor={colorForSkeleton.baseColor} highlightColor={colorForSkeleton.highlightColor}>
          <div className={styles['videos-block']}>
            {!convertValueToBoolean(totalGeneralVideos) &&
              returnEmptyArrayForSkeleton(numberOfVideosForGeneralBlock).map((_, index) => (
                <VideoSkeleton key={index} />
              ))}
          </div>
          {convertValueToBoolean(totalGeneralVideos) && (
            <div className={styles['videos-block']}>{videoCards.slice(0, numberOfVideosForGeneralBlock)}</div>
          )}
        </SkeletonTheme>
      )}
      {!isGeneralBlock && !isLazyBlock && (
        <SkeletonTheme baseColor={colorForSkeleton.baseColor} highlightColor={colorForSkeleton.highlightColor}>
          <div className={styles['videos-block']}>
            {!convertValueToBoolean(videoCards.length) &&
              returnEmptyArrayForSkeleton(4).map((_, index) => <VideoSkeleton key={index} />)}
          </div>
          {convertValueToBoolean(videoCards.length) && <div className={styles['videos-block']}>{videoCards}</div>}
        </SkeletonTheme>
      )}
    </div>
  );
};

export { VideosBlock };
