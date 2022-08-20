import { VideoCard } from 'components/search/components/components';
import { VideoCard as VideoCardProps, FC } from 'common/types/types';

import styles from './videos-block.module.scss';

export interface VideoBlockProps {
  titleBlock?: string;
  videos: Array<VideoCardProps>;
}

const VideosBlock: FC<VideoBlockProps> = ({ videos, titleBlock }) => {
  return (
    <div className={styles['separate-video-block']}>
      {titleBlock && <h2 className={styles['video-block-title']}>{titleBlock}</h2>}
      <div className={styles['videos-block']}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export { VideosBlock };
