import { DataStatus, IconColor, IconName } from 'common/enums/enums';
import { Button, Icon, Loader, VideoCardMain } from 'components/common/common';
import React, { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector, useState } from '../../hooks/hooks';

import { videoActions } from '../../store/actions';
import { generateHistorySkeletons } from '../history-page/common/skeleton/skeleton';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const BrowsePage: FC = () => {
  const dispatch = useAppDispatch();

  const [activeCategory, setActiveCategory] = useState<string>('live');

  const categoryList = ['live', 'music', 'gaming', 'film animation'];

  const handleCategoryClick = (category: string): void => {
    dispatch(videoActions.getPopularVideos({ page: 1, category: activeCategory }));
    setActiveCategory(category);
  };

  const videoData = useAppSelector((state) => {
    return state.videos;
  });

  const isLightTheme = useAppSelector((state) => {
    return state.theme.isLightTheme;
  });

  const { popular: popularVideos } = videoData.data;

  const { currentPage, lastPage } = popularVideos;

  useEffect(() => {
    dispatch(videoActions.getPopularVideos({ page: 1, category: activeCategory }));
  }, [activeCategory, dispatch]);

  const loadMore = (): void => {
    dispatch(videoActions.getPopularVideos({ page: currentPage + 1, category: activeCategory }));
  };

  const [sentryRef] = useInfiniteScroll({
    loading: videoData.dataStatus === DataStatus.PENDING,
    hasNextPage: currentPage < lastPage,
    onLoadMore: loadMore,
    disabled: videoData.error,
  });

  return (
    <div className={styles['browse-page-container']}>
      <div className={styles['browse-page-header-container']}>
        <Icon name={IconName.COMPASS} color={IconColor.GRAY} width={'40'} height={'40'}></Icon>
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
        {videoData.dataStatus === DataStatus.PENDING ? generateHistorySkeletons(isLightTheme) : null}
        {popularVideos.list.map((video) => {
          return <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />;
        })}
        <div ref={sentryRef}>
          {videoData.dataStatus === DataStatus.PENDING && popularVideos.list.length > 0 ? (
            <Loader hCentered={true} vCentered={true} spinnerSize={'md'} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export { BrowsePage };
