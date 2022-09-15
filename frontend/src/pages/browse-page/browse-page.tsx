import { DataStatus, IconColor, IconName } from 'common/enums/enums';
import { Button, Icon, VideoCardMain } from 'components/common/common';
import React, { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector, useState } from '../../hooks/hooks';

import { categoryActions, videoActions } from '../../store/actions';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { generateBrowsePageSkeleton } from './common/skeleton';
import { NoVideosYet } from '../../components/common/no-videos-yet/no-videos-yet';
import { LeftArrow, RightArrow } from '../../components/common/vertical-scroll/vertical-scroll';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { uglyDisplayCategoryName } from 'helpers/categories/categories';

const BrowsePage: FC = () => {
  const dispatch = useAppDispatch();

  const [activeCategory, setActiveCategory] = useState<string>('live');

  const { categories, preferences } = useAppSelector((store) => ({
    categories: store.category.data,
    preferences: store.preference.data,
  }));

  const categoryList = [
    'live',
    ...categories.filter((category) => preferences.includes(category.id)).map((category) => category.name),
  ];

  const handleCategoryClick = (category: string): void => {
    if (uglyDisplayCategoryName(activeCategory) === reposnseCategory && activeCategory !== category) {
      setActiveCategory(category);
    }
  };

  const videoData = useAppSelector((state) => {
    return state.videos;
  });

  const isLightTheme = useAppSelector((state) => {
    return state.theme.isLightTheme;
  });

  const { popular: popularVideos } = videoData.data;

  const { dataStatus } = videoData;

  const { currentPage, lastPage, category: reposnseCategory, firstLoad } = popularVideos;

  useEffect(() => {
    if (firstLoad) {
      dispatch(videoActions.getPopularVideos({ page: 1, category: activeCategory }));
      dispatch(categoryActions.getCategories());
    } else if (uglyDisplayCategoryName(activeCategory) !== reposnseCategory) {
      dispatch(videoActions.getPopularVideos({ page: 1, category: activeCategory }));
    }
  }, [activeCategory, dispatch, firstLoad, reposnseCategory]);

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
        <h2 className={styles['browse-page-header']}>Browse</h2>
      </div>
      <div className={styles['browse-page-categories-container']}>
        <ScrollMenu
          LeftArrow={<LeftArrow isFollowingOrBrowse={true} />}
          RightArrow={<RightArrow isFollowingOrBrowse={true} />}
          wrapperClassName={styles['horizontal-scroll']}
          scrollContainerClassName={styles['horizontal-scroll']}
        >
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
        </ScrollMenu>
      </div>
      <div
        className={clsx(
          {
            [styles['no-video-in-list']]:
              !popularVideos.list.length && videoData.dataStatus !== DataStatus.PENDING && currentPage > 0,
          },
          styles['browse-page-video-container'],
        )}
      >
        {dataStatus === DataStatus.PENDING && generateBrowsePageSkeleton(isLightTheme)}
        {!popularVideos.list.length && videoData.dataStatus !== DataStatus.PENDING && currentPage > 0 ? (
          <div className={styles['no-video-in-list']}>
            <NoVideosYet />
          </div>
        ) : (
          popularVideos.list.map((video) => {
            return <VideoCardMain key={video.id} video={video} isLightTheme={isLightTheme} />;
          })
        )}
        <div ref={sentryRef}>
          {videoData.dataStatus === DataStatus.PENDING &&
            popularVideos.list.length > 0 &&
            generateBrowsePageSkeleton(isLightTheme)}
        </div>
      </div>
    </div>
  );
};
export { BrowsePage };
