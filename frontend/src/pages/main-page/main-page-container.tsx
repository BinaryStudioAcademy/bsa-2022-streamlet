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

const MainPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { categories, isLightTheme, user, generalVideoBlock, recommendedVideoBlock } = useAppSelector((state) => ({
    generalVideoBlock: state.videos.data.generalVideos.list,
    recommendedVideoBlock: state.videos.data.recommendedVideos.list,
    categories: state.category.data,
    isLightTheme: state.theme.isLightTheme,
    user: state.auth.user,
  }));

  const isLogin = Boolean(user);

  function handleClickFilter(id: string): void {
    dispatch(activeCategory({ id }));
    dispatch(getVideosByCategory());
  }

  function handleClickClearFilters(): void {
    dispatch(clearFilters());
    dispatch(getVideosByCategory());
  }

  const filterBlock: FilterBlockProps = {
    filterList: categories,
    handleClickFilter,
    handleClickClearFilters,
  };

  const generalVideos = {
    blockTitle: '',
    videoCards: generalVideoBlock.map((video) => (
      <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />
    )),
    isLazyBlock: false,
    isGeneralBlock: true,
  };

  const blockVideo = [
    {
      blockTitle: isLogin ? 'Recommended for you' : '',
      videoCards: recommendedVideoBlock.map((video) => (
        <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />
      )),
      isLazyBlock: true,
    },
  ];

  if (isLogin) {
    blockVideo.unshift(generalVideos);
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
