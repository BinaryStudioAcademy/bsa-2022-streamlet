import { FC } from 'common/types/types';
import { MainPage } from './main-page';
import { FilterBlockProps } from 'components/common/filters-block';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getVideos, getVideosByCategory, resetPaginationMainPage } from 'store/videos/actions';
import { VideoCardMain } from 'components/common/common';
import { activeCategory, clearFilters, getCategories } from 'store/categories/actions';

const MainPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { videos, categories, isLightTheme } = useAppSelector((state) => ({
    videos: state.videos.data.list,
    categories: state.category.data,
    isLightTheme: state.theme.isLightTheme,
  }));

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
  const blockVideo = [
    // {
    //   videoCards: videos
    //     .map((video) => <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />)
    //     .slice(0, 5),
    // },
    {
      blockTitle: 'Recommended for you',
      videoCards: videos.map((video) => <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />),
      isLazyBlock: true,
    },
  ];

  useEffect(() => {
    dispatch(getVideos({ withLazyLoad: true }));
    dispatch(getCategories());

    return () => {
      dispatch(resetPaginationMainPage());
    };
  }, [dispatch]);

  return <MainPage filterBlockProps={filterBlock} blocksVideo={blockVideo} />;
};

export { MainPageContainer };
