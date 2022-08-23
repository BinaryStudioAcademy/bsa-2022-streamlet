import { FC, BaseVideoResponseDto } from 'common/types/types';

import styles from './videos-block.module.scss';
import { VideoCardMain } from '../common';
import { VideoSkeleton } from '../video-skeleton/video-skeleton';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ARRAY_FAKE_VIDEOS } from '../video-skeleton/video-skeleton.config';

export interface VideoBlockProps {
  titleBlock?: string;
  videos: Array<BaseVideoResponseDto>;
}

const VideosBlock: FC<VideoBlockProps> = ({ videos, titleBlock }) => {
  return (
    <div className={styles['separate-video-block']}>
      {titleBlock && <h2 className={styles['video-block-title']}>{titleBlock}</h2>}
      <SkeletonTheme baseColor="#1f222a" highlightColor="#474747">
        <div className={styles['videos-block']}>
          {!videos.length && ARRAY_FAKE_VIDEOS.map((_, index) => <VideoSkeleton key={index} />)}
          {videos.map((video) => (
            <VideoCardMain key={video.id} video={video} />
          ))}
        </div>
      </SkeletonTheme>
    </div>
  );
};

export { VideosBlock };
