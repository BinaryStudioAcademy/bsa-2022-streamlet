import { VideoCardMain } from 'components/common/common';
import { FilterBlockProps, FiltersBlock } from 'components/common/filters-block';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, useEffect } from 'react';
import { getVideos } from 'store/videos/actions';
import styles from './styles.module.scss';

// currently just a placeholder that can be filled with any content in the future

// NOTE: if you plan to use Infinite scroll for recommendations,
// remember that on smaller screens the layout of video page collapses into one column
// and comments are bellow recommendations (as on youtube)
// so on smaller screen sizes don't use infinite scroll (i guess you could use media queries), because it will be impossible to reach comments
interface BlockProps {
  videoId?: string;
  filterBlockProps: FilterBlockProps;
}

const LinksBlock: FC<BlockProps> = ({ filterBlockProps }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  const videos = useAppSelector((state) => state.videos.data.list);
  const isLightTheme = useAppSelector((state) => state.theme.isLightTheme);

  return (
    <div className={styles['links-block']}>
      <FiltersBlock inRecommendedSection={true} {...filterBlockProps} />
      {videos.map((video) => (
        <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />
      ))}
    </div>
  );
};

export { LinksBlock };
