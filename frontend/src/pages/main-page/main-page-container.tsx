import { FC } from 'common/types/types';
import { MainPage } from './main-page';
import { FilterBlockProps } from 'components/common/filters-block';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getVideos, getVideosByCategory } from 'store/videos/actions';
import { VideoCardMain } from 'components/common/common';
import { loadMyChannel } from 'store/channel/actions';
import { activeCategory, clearFilters, getCategories } from 'store/categories/actions';

const MainPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.videos.data.list);
  const categories = useAppSelector((state) => state.category.data);

  const isLightTheme = useAppSelector((state) => state.theme.isLightTheme);

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
    { videoCards: videos.map((video) => <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />) },
  ];

  useEffect(() => {
    dispatch(getVideos());
    dispatch(getCategories());
    dispatch(loadMyChannel());
  }, [dispatch]);

  return <MainPage filterBlockProps={filterBlock} blocksVideo={blockVideo} />;
};

export { MainPageContainer };
