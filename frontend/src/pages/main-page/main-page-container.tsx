import { FC } from 'common/types/types';
import { MainPage } from './main-page';
import { filterList } from '../../components/common/filters-block/filter-list.mock';
import { FilterBlockProps } from 'components/common/filters-block';
import { blocksVideo } from 'components/common/videos-block/videos.mock';

function handleClickFilter(): void {
  void 1;
}

const filterBlockProps: FilterBlockProps = {
  filterList,
  handleClickFilter,
};

const MainPageContainer: FC = () => {
  return <MainPage filterBlockProps={filterBlockProps} blocksVideo={blocksVideo} />;
};

export { MainPageContainer };
