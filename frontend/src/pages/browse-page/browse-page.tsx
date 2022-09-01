import { IconColor, IconName } from 'common/enums/enums';
import { Button, Icon } from 'components/common/common';
import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector, useState, useWindowDimensions } from '../../hooks/hooks';

import { videoActions } from '../../store/actions';
import { VideoCard } from '../../components/search/components/components';

const BrowsePage: FC = () => {
  const dispatch = useAppDispatch();

  const { width } = useWindowDimensions();

  const [iconSize, setIconSize] = useState<string>('80');

  const [activeCategory, setActiveCategory] = useState<string>('live');

  const categoryList = ['live', 'music', 'gaming', 'films'];

  const handleCategoryClick = (category: string): void => {
    dispatch(videoActions.getPopularVideos({ page: 1, category: activeCategory }));
    setActiveCategory(category);
  };

  const popularVideos = useAppSelector((state) => {
    return state.videos.data.popular;
  });

  useEffect(() => {
    dispatch(videoActions.getPopularVideos({ page: 1, category: activeCategory }));
  }, [activeCategory, dispatch]);

  if (width <= 400 && iconSize !== '40') {
    setIconSize('40');
  } else if (width > 400 && iconSize !== '80') {
    setIconSize('80');
  }

  return (
    <div className={styles['browse-page-container']}>
      <div className={styles['browse-page-header-container']}>
        <Icon name={IconName.COMPASS} color={IconColor.GRAY} width={iconSize} height={iconSize}></Icon>
        <h2 className={styles['browse-page-header']}>Trending</h2>
      </div>
      <div className={styles['browse-page-categories-container']}>
        {categoryList.map((category, index) => {
          return (
            <Button
              content={category}
              key={`${category}-${index}`}
              className={clsx(styles['categories-button'], {
                [styles['active-categories-button']]: activeCategory === category,
              })}
              onClick={(): void => handleCategoryClick(category)}
            />
          );
        })}
      </div>
      <div className={styles['browse-page-video-container']}>
        {popularVideos.list.map((video) => {
          return <VideoCard key={video.id} video={video} isLightTheme={true} />;
        })}
      </div>
    </div>
  );
};
export { BrowsePage };
