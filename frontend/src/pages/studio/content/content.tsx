import clsx from 'clsx';
import { DataStatus, IconColor, IconName } from 'common/enums/enums';
import { Icon, Tooltip } from 'components/common/common';
import { useAppDispatch, useAppSelector, useWindowDimensions } from 'hooks/hooks';
import React, { FC, useEffect, useState } from 'react';
import { getMyVideos, pickAllVideo, unloadVideos } from 'store/content-page/actions';
import { VideoRow } from './common/video-row';
import styles from './styles.module.scss';

export const StudioContent: FC = () => {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { videos, isLoading, isNeedExtendedMeny, pickedCount } = useAppSelector((store) => ({
    videos: store.contentPage.data,
    isLoading: Boolean(store.contentPage.dataStatus !== DataStatus.FULFILLED),
    isNeedExtendedMeny: Boolean(store.contentPage.data.filter((video) => video.isActive).length),
    pickedCount: store.contentPage.data.filter((video) => video.isActive).length,
  }));

  useEffect(() => {
    dispatch(getMyVideos());
    return () => {
      dispatch(unloadVideos());
    };
  }, [dispatch]);
  const [isChecked, setIsChecked] = useState(false);
  const checkAllHanler = (): void => {
    setIsChecked(!isChecked);
    dispatch(pickAllVideo({ isPick: !isChecked }));
  };
  useEffect(() => {
    if (!isLoading) {
      setIsChecked(pickedCount === videos.length);
    }
  }, [pickedCount, isLoading, videos]);

  return (
    <div className={styles['studio']}>
      <Tooltip isLightTheme={false} />
      <h1 className={styles['header']}>Channel content</h1>
      <div className={styles['body']}>
        <div className={styles[isNeedExtendedMeny ? 'extended-menu-open' : 'extended-menu-closed']}>
          <div className={clsx(styles['extended-menu-body'], { [styles.displaynone]: !isNeedExtendedMeny })}>
            <div className={styles['picked-count']}>{`Picked ${pickedCount} ${
              pickedCount > 1 ? 'videos' : 'video'
            }`}</div>
            <div className={styles['extented-segment']}>
              <div className={styles['extented-segment-title']}>Change</div>
              <Icon name={IconName.ARROW_DOWN} color={IconColor.WHITE} />
            </div>
            <div className={styles['extented-segment']}>
              <div className={styles['extented-segment-title']}>Others</div>
              <Icon name={IconName.ARROW_DOWN} color={IconColor.WHITE} />
            </div>
          </div>
        </div>
        <table className={styles['table']}>
          <tr>
            <th>
              <input checked={isChecked} onChange={checkAllHanler} type="checkbox" className={styles['checkbox']} />
            </th>
            <th>Video</th>
            <th data-tip={width >= 1300 ? '' : 'Visibility'}>Visibility</th>
            <th data-tip={width >= 1300 ? '' : 'Date'}>Date</th>
            <th data-tip={width >= 1300 ? '' : 'Views'}>Views</th>
            <th data-tip={width >= 1300 ? '' : 'Comments'}>Comments</th>
            <th data-tip={width >= 1300 ? '' : 'Likes / Dislikes'}>{width >= 1300 ? 'Likes / Dislikes' : 'L/D'}</th>
            <th></th>
          </tr>
          {videos.map((video) => (
            <VideoRow {...video} key={video.id} />
          ))}
        </table>
      </div>
    </div>
  );
};
