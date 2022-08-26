import { FC } from 'common/types/types';
import { MainPage } from './main-page';
import { filterList } from '../../components/common/filters-block/filter-list.mock';
import { FilterBlockProps } from 'components/common/filters-block';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getVideos } from 'store/videos/actions';
import { VideoCardMain } from 'components/common/common';

function handleClickFilter(): void {
  void 1;
}

const filterBlockProps: FilterBlockProps = {
  filterList,
  handleClickFilter,
};

const MainPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.videos.data.list);
  const isLightTheme = useAppSelector((state) => state.theme.isLightTheme);
  const blockVideo = [
    { videoCards: videos.map((video) => <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />) },
  ];

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  return <MainPage filterBlockProps={filterBlockProps} blocksVideo={blockVideo} />;
};

export { MainPageContainer };
