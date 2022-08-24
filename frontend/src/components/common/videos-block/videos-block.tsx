import { FC, BaseVideoResponseDto } from 'common/types/types';
import { VideoCardMain } from '../common';
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
export interface VideoBlockProps {
  blockTitle?: string;
  videos: Array<BaseVideoResponseDto>;
}

const VideosBlock: FC<VideoBlockProps> = ({ videos, blockTitle }) => {
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
          {videos.map((video) => (
            <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />
          ))}
        </div>
      </SkeletonTheme>
    </div>
  );
};

export { VideosBlock };
