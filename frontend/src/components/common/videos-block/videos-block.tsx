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
import { ReactNode, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getVideos } from 'store/videos/actions';
import { Loader } from '../common';
export interface VideoBlockProps {
  blockTitle?: string;
  videoCards: ReactNode[];
  loadingStatus: DataStatus;
  isLazyBlock?: boolean;
}

const VideosBlock: FC<VideoBlockProps> = ({ blockTitle, videoCards, loadingStatus, isLazyBlock }) => {
  const dispatch = useAppDispatch();
  const { isLightTheme, lazyLoad, totalVideos, numberOfUploadedVideos, numberOfVideoForUpload } = useAppSelector(
    (state) => ({
      isLightTheme: state.theme.isLightTheme,
      lazyLoad: state.videos.pagination.lazyLoad,
      totalVideos: state.videos.data.total,
      numberOfUploadedVideos: state.videos.data.list.length,
      numberOfVideoForUpload: state.videos.pagination.countItems,
    }),
  );

  const numberSkeleton = useMemo(() => {
    if (!numberOfUploadedVideos) {
      return numberOfVideoForUpload;
    }

    if (numberOfUploadedVideos > numberOfVideoForUpload) {
      return 0;
    }

    if (totalVideos - numberOfUploadedVideos >= numberOfVideoForUpload) {
      return numberOfVideoForUpload;
    }

    return totalVideos - numberOfUploadedVideos;
  }, [numberOfUploadedVideos, totalVideos, numberOfVideoForUpload]);

  const colorForSkeleton = {
    baseColor: isLightTheme ? LIGHT_THEME_BASE_COLOR : DARK_THEME_BASE_COLOR,
    highlightColor: isLightTheme ? LIGHT_THEME_HIGHLIGHT_COLOR : DARK_THEME_HIGHLIGHT_COLOR,
  };

  const uploadVideos = (): void => {
    dispatch(getVideos({ withLazyLoad: true }));
  };

  const returnEmptyArrayForSkeleton = (): Array<null> => {
    return Array(numberSkeleton).fill(null);
  };

  return (
    <div className={styles['separate-video-block']}>
      {blockTitle && <h2 className={styles['video-block-title']}>{blockTitle}</h2>}
      <InfiniteScroll
        dataLength={videoCards.length}
        next={uploadVideos}
        scrollableTarget="main-content"
        hasMore={lazyLoad}
        loader={
          <div className={styles['loader-block']}>
            <Loader spinnerSize={LoaderSize.XS} />
          </div>
        }
      >
        <SkeletonTheme baseColor={colorForSkeleton.baseColor} highlightColor={colorForSkeleton.highlightColor}>
          <div className={styles['videos-block']}>
            {loadingStatus === DataStatus.FULFILLED && !isLazyBlock && videoCards}
            {isLazyBlock && videoCards}
            {loadingStatus === DataStatus.PENDING &&
              returnEmptyArrayForSkeleton().map((_, index) => <VideoSkeleton key={index} />)}
          </div>
        </SkeletonTheme>
      </InfiniteScroll>
    </div>
  );
};

export { VideosBlock };
