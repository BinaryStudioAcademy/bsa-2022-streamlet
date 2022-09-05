import { FC } from 'common/types/types';
import { FilterBlockProps, FiltersBlock } from 'components/common/filters-block';
import { EMPTY_VIDEO_BLOCK } from 'components/common/video-skeleton/video-skeleton.config';
import { VideoBlockProps, VideosBlock } from 'components/common/videos-block/videos-block';
import { useAppSelector } from 'hooks/hooks';

import styles from './main-page.module.scss';

interface MainPageProps {
  filterBlockProps: FilterBlockProps;
  blocksVideo: Array<Omit<VideoBlockProps, 'loadingStatus'>> | [];
}

const MainPage: FC<MainPageProps> = ({ filterBlockProps, blocksVideo }) => {
  const loadingStatus = useAppSelector((state) => state.videos.dataStatus);

  return (
    <main className={styles.main}>
      <FiltersBlock {...filterBlockProps} />
      <div className={styles['videos-container']}>
        {!blocksVideo.length && <VideosBlock loadingStatus={loadingStatus} videoCards={EMPTY_VIDEO_BLOCK} />}
        {blocksVideo.map((videoBlock, index) => (
          <VideosBlock key={index} {...videoBlock} loadingStatus={loadingStatus} />
        ))}
      </div>
    </main>
  );
};

export { MainPage };
