import { FC } from 'common/types/types';
import { FilterBlockProps, FiltersBlock } from 'components/common/filters-block';
import { PreferencesModalContainer } from 'components/common/preferences-modal/preferences-modal-container';
import { EMPTY_VIDEO_BLOCK } from 'components/common/video-skeleton/video-skeleton.config';
import { VideoBlockProps, VideosBlock } from 'components/common/videos-block/videos-block';
import { useAppDispatch, useAppSelector, useEffect, useRef, useGetWindowDimensions } from 'hooks/hooks';
import { useLayoutEffect, useState } from 'react';
import { setNumberOfVideoForLoading } from 'store/videos/actions';
import {
  HEIGHT_FILTER_BLOCK,
  HEIGHT_HEADER,
  VIDEO_AVERAGE_HEIGHT,
  VIDEO_AVERAGE_WIDTH,
  WIDTH_CLOSED_SIDEBAR,
  PADDING_ON_MAIN_PAGE,
  SMALL_SCREEN_SIZE,
} from './main-page-number-of-videos-loading.config';

import styles from './main-page.module.scss';

interface MainPageProps {
  filterBlockProps: FilterBlockProps;
  blocksVideo: Array<Omit<VideoBlockProps, 'loadingStatus'>> | [];
}

const MainPage: FC<MainPageProps> = ({ filterBlockProps, blocksVideo }) => {
  const dispatch = useAppDispatch();
  const { loadingStatus, isOpenSidebar } = useAppSelector((state) => ({
    loadingStatus: state.videos.dataStatus,
    isOpenSidebar: state.layout.isOpenSidebar,
  }));
  const { width, height } = useGetWindowDimensions();
  const mainPageRef = useRef<HTMLDivElement>(null);
  const [widthContent, setWidthContent] = useState(0);

  useEffect(calculateNumberOfVideosLoading, [dispatch, width, height]);

  function calculateNumberOfVideosLoading(): void {
    if (width <= SMALL_SCREEN_SIZE) {
      dispatch(setNumberOfVideoForLoading({ numberOfItems: 4 }));
      return;
    }

    const widthMainPage = width - WIDTH_CLOSED_SIDEBAR - PADDING_ON_MAIN_PAGE * 2;
    const heightMainPage = height - HEIGHT_FILTER_BLOCK - HEIGHT_HEADER - PADDING_ON_MAIN_PAGE * 2;
    const numbersOfVideosFitOnThePage =
      Math.floor(widthMainPage / VIDEO_AVERAGE_WIDTH) * (Math.floor(heightMainPage / VIDEO_AVERAGE_HEIGHT) + 1);

    dispatch(setNumberOfVideoForLoading({ numberOfItems: numbersOfVideosFitOnThePage }));
  }

  useLayoutEffect(() => {
    setWidthContent(mainPageRef.current?.offsetWidth ?? 0);
  }, [mainPageRef.current?.offsetWidth, isOpenSidebar]);

  return (
    <main ref={mainPageRef} className={styles.main}>
      <PreferencesModalContainer />
      <FiltersBlock {...filterBlockProps} />
      <div className={styles['videos-container']}>
        {!blocksVideo.length && <VideosBlock loadingStatus={loadingStatus} videoCards={EMPTY_VIDEO_BLOCK} />}
        {blocksVideo.map((videoBlock, index) => (
          <VideosBlock key={index} {...videoBlock} loadingStatus={loadingStatus} widthContent={widthContent} />
        ))}
      </div>
    </main>
  );
};

export { MainPage };
