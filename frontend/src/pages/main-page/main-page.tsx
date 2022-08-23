import { FC } from 'common/types/types';
import { FilterBlockProps, FiltersBlock } from 'components/common/filters-block';
import { EMPTY_VIDEO_BLOCK } from 'components/common/video-skeleton/video-skeleton.config';
import { VideoBlockProps, VideosBlock } from 'components/common/videos-block/videos-block';

import styles from './main-page.module.scss';

interface MainPageProps {
  filterBlockProps: FilterBlockProps;
  blocksVideo: Array<VideoBlockProps> | [];
}

const MainPage: FC<MainPageProps> = ({ filterBlockProps, blocksVideo }) => (
  <main className={styles.main}>
    <FiltersBlock {...filterBlockProps} />
    <div className={styles['videos-container']}>
      {!blocksVideo.length && <VideosBlock videos={EMPTY_VIDEO_BLOCK} />}
      {blocksVideo.map((videoBlock, index) => (
        <VideosBlock key={index} {...videoBlock} />
      ))}
    </div>
  </main>
);

export { MainPage };
