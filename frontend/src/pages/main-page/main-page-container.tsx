import { FC } from 'common/types/types';
import { MainPage } from './main-page';
// import { filterList } from '../../components/common/filters-block/filter-list.mock';
import { FilterBlockProps } from 'components/common/filters-block';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getVideos } from 'store/videos/actions';
import { VideoCardMain } from 'components/common/common';
import { getCategories } from 'store/categories/actions';

function handleClickFilter(): void {
  void 1;
}

const MainPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.videos.data.list);
  const categories = useAppSelector((state) => state.category.data);
  const isLightTheme = useAppSelector((state) => state.theme.isLightTheme);
  const filterBlock: FilterBlockProps = {
    filterList: categories,
    handleClickFilter,
  };
  const blockVideo = [
    { videoCards: videos.map((video) => <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />) },
  ];

  useEffect(() => {
    dispatch(getVideos());
    dispatch(getCategories());
  }, [dispatch]);

  return <MainPage filterBlockProps={filterBlock} blocksVideo={blockVideo} />;
};

export { MainPageContainer };
