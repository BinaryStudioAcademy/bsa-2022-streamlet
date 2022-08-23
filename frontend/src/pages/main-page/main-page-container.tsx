import { FC } from 'common/types/types';
import { MainPage } from './main-page';
import { filterList } from '../../components/common/filters-block/filter-list.mock';
import { FilterBlockProps } from 'components/common/filters-block';
import { VideoBlockProps } from 'components/common/videos-block/videos-block';
import { useEffect, useState } from 'react';
import { videoApi } from 'services/services';

function handleClickFilter(): void {
  void 1;
}

const filterBlockProps: FilterBlockProps = {
  filterList,
  handleClickFilter,
};

const MainPageContainer: FC = () => {
  const [blockVideo, setBlockVideo] = useState<VideoBlockProps[] | []>([]);

  useEffect(() => {
    (async function getAllVideos(): Promise<void> {
      const videos = await videoApi.getVideos();

      setBlockVideo([{ videos: videos }]);
    })();
  }, []);

  return <MainPage filterBlockProps={filterBlockProps} blocksVideo={blockVideo} />;
};

export { MainPageContainer };
