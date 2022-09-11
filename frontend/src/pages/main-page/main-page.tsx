import { FC } from 'common/types/types';
import { FilterBlockProps, FiltersBlock } from 'components/common/filters-block';
import { PreferencesModalContainer } from 'components/common/preferences-modal/preferences-modal-container';
import { EMPTY_VIDEO_BLOCK } from 'components/common/video-skeleton/video-skeleton.config';
import { VideoBlockProps, VideosBlock } from 'components/common/videos-block/videos-block';
import { useAppDispatch, useAppSelector, useEffect, useWindowDimensions } from 'hooks/hooks';
import { setNumberOfVideoForLoading } from 'store/videos/actions';
import { matchScreenSize, ScreenSizesForMainPage } from './main-page-number-of-videos-loading.config';

import styles from './main-page.module.scss';

interface MainPageProps {
  filterBlockProps: FilterBlockProps;
  blocksVideo: Array<Omit<VideoBlockProps, 'loadingStatus'>> | [];
}

const MainPage: FC<MainPageProps> = ({ filterBlockProps, blocksVideo }) => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector((state) => state.videos.dataStatus);
  const { width } = useWindowDimensions();

  useEffect(calculateNumberOfVideosLoading, [width, dispatch]);

  function calculateNumberOfVideosLoading(): void {
    if (width < ScreenSizesForMainPage.SMALL) {
      dispatch(setNumberOfVideoForLoading({ numberOfItems: matchScreenSize[ScreenSizesForMainPage.SMALL] }));
      return;
    }

    if (width >= ScreenSizesForMainPage.SMALL && width < ScreenSizesForMainPage.AVERAGE) {
      dispatch(setNumberOfVideoForLoading({ numberOfItems: matchScreenSize[ScreenSizesForMainPage.AVERAGE] }));
      return;
    }

    if (width >= ScreenSizesForMainPage.AVERAGE && width < ScreenSizesForMainPage.LARGE) {
      dispatch(setNumberOfVideoForLoading({ numberOfItems: matchScreenSize[ScreenSizesForMainPage.LARGE] }));
      return;
    }
    dispatch(setNumberOfVideoForLoading({ numberOfItems: matchScreenSize[ScreenSizesForMainPage.VERY_LARGE] }));
  }

  return (
    <main className={styles.main}>
      <PreferencesModalContainer />
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
