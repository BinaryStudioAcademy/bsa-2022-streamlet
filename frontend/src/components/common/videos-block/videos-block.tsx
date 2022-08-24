import { FC, BaseVideoResponseDto } from 'common/types/types';
import { VideoCardMain } from '../common';
import { VideoSkeleton } from '../video-skeleton/video-skeleton';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ARRAY_FAKE_VIDEOS } from '../video-skeleton/video-skeleton.config';
import { useAppSelector } from 'hooks/hooks';
import { DataStatus } from 'common/enums/enums';

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

  return (
    <div className={styles['separate-video-block']}>
      {blockTitle && <h2 className={styles['video-block-title']}>{blockTitle}</h2>}
      <SkeletonTheme baseColor="#1f222a" highlightColor="#474747">
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
