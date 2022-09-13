import { FC } from 'common/types/types';
import { MainPage } from './main-page';
import { FilterBlockProps } from 'components/common/filters-block';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import {
  getGeneralVideosBlock,
  getRecommendedVideos,
  getVideosByCategory,
  resetGeneralVideos,
  resetPaginationMainPage,
  resetRecommendedVideos,
} from 'store/videos/actions';
import { VideoCardMain } from 'components/common/common';
import { activeCategory, clearFilters, getCategories } from 'store/categories/actions';
import { DataStatus } from 'common/enums/enums';
import { VideoBlockProps } from 'components/common/videos-block/videos-block';

const MainPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const {
    categories,
    isLightTheme,
    user,
    generalVideoBlock,
    recommendedVideoBlock,
    statusGeneralVideos,
    totalVideosByCategory,
    selectedVideosByCategory,
  } = useAppSelector((state) => ({
    generalVideoBlock: state.videos.data.generalVideos.list,
    recommendedVideoBlock: state.videos.data.recommendedVideos.list,
    selectedVideosByCategory: state.videos.data.list,
    totalVideosByCategory: state.videos.data.total,
    categories: state.category.data,
    isLightTheme: state.theme.isLightTheme,
    user: state.auth.user,
    statusGeneralVideos: state.videos.data.generalVideos.status,
  }));

  const isLogin = Boolean(user);

  function handleClickFilter(id: string): void {
    dispatch(activeCategory({ id }));
    dispatch(getVideosByCategory());
  }

  function handleClickClearFilters(): void {
    dispatch(clearFilters());
    dispatch(resetPaginationMainPage());
  }

  const filterBlock: FilterBlockProps = {
    filterList: [
      {
        id: '1',
        name: 'All',
        isActive: true,
      },
      ...categories.map(({ name, ...rest }) => ({
        name: name
          .split('&')
          .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
          .join(' & '),
        ...rest,
      })),
    ],
    handleClickFilter,
    handleClickClearFilters,
  };

  let blockVideo: Omit<VideoBlockProps, 'loadingStatus'>[] = [];
  const generalVideos = {
    videoCards: generalVideoBlock.map((video) => (
      <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />
    )),
    isGeneralBlock: true,
  };
  const recommendedBlock = {
    blockTitle: isLogin ? 'Recommended for you' : '',
    videoCards: recommendedVideoBlock.map((video) => (
      <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />
    )),
    isLazyBlock: true,
  };

  if (
    (isLogin && statusGeneralVideos === DataStatus.FULFILLED && generalVideoBlock.length) ||
    (isLogin && statusGeneralVideos === DataStatus.IDLE)
  ) {
    blockVideo.push(generalVideos);
  }

  if (!totalVideosByCategory) {
    blockVideo.push(recommendedBlock);
  }

  if (totalVideosByCategory) {
    blockVideo = [
      {
        videoCards: selectedVideosByCategory.map((video) => (
          <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />
        )),
        isLazyBlock: false,
      },
    ];
  }

  useEffect(() => {
    if (isLogin) {
      dispatch(getGeneralVideosBlock());
    }

    dispatch(getRecommendedVideos());
    dispatch(getCategories());

    return () => {
      dispatch(resetRecommendedVideos());
      dispatch(resetPaginationMainPage());
      dispatch(resetGeneralVideos());
    };
  }, [dispatch, isLogin]);

  return <MainPage filterBlockProps={filterBlock} blocksVideo={blockVideo} />;
};

export { MainPageContainer };
