import { FC } from 'common/types/types';
import { VideoSkeleton } from '../video-skeleton/video-skeleton';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useAppSelector } from 'hooks/hooks';
import { DataStatus } from 'common/enums/enums';
import {
  ARRAY_FAKE_VIDEOS,
  DARK_THEME_BASE_COLOR,
  DARK_THEME_HIGHLIGHT_COLOR,
  LIGHT_THEME_BASE_COLOR,
  LIGHT_THEME_HIGHLIGHT_COLOR,
} from '../video-skeleton/video-skeleton.config';

import styles from './videos-block.module.scss';
import { ReactNode } from 'react';
export interface VideoBlockProps {
  blockTitle?: string;
  videoCards: ReactNode[];
}

const VideosBlock: FC<VideoBlockProps> = ({ blockTitle, videoCards }) => {
  const { statusVideoLoading, isLightTheme } = useAppSelector((state) => ({
    statusVideoLoading: state.videos.dataStatus,
    isLightTheme: state.theme.isLightTheme,
  }));

  const colorForSkeleton = {
    baseColor: isLightTheme ? LIGHT_THEME_BASE_COLOR : DARK_THEME_BASE_COLOR,
    highlightColor: isLightTheme ? LIGHT_THEME_HIGHLIGHT_COLOR : DARK_THEME_HIGHLIGHT_COLOR,
  };

  return (
    <div className={styles['separate-video-block']}>
      {blockTitle && <h2 className={styles['video-block-title']}>{blockTitle}</h2>}
      <SkeletonTheme baseColor={colorForSkeleton.baseColor} highlightColor={colorForSkeleton.highlightColor}>
        <div className={styles['videos-block']}>
          {statusVideoLoading === DataStatus.PENDING &&
            ARRAY_FAKE_VIDEOS.map((_, index) => <VideoSkeleton key={index} />)}
          {videoCards}
        </div>
      </SkeletonTheme>
    </div>
  );
};

export { VideosBlock };
