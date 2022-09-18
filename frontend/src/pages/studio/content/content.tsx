import clsx from 'clsx';
import { DataStatus, IconColor, IconName } from 'common/enums/enums';
import { Icon, Tooltip } from 'components/common/common';
import { useAppDispatch, useAppSelector, useWindowDimensions } from 'hooks/hooks';
import React, { FC, useEffect, useState } from 'react';
import { getMyVideos, pickAllVideo, unloadVideos } from 'store/content-page/actions';
import { VideoRow } from './common/video-row';
import { ReactComponent as Eye } from 'assets/img/eye.svg';
import styles from './styles.module.scss';

export const StudioContent: FC = () => {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { videos, isLoading, isNeedExtendedMenu, pickedVideos } = useAppSelector((store) => ({
    videos: store.contentPage.data,
    isLoading: Boolean(store.contentPage.dataStatus !== DataStatus.FULFILLED),
    isNeedExtendedMenu: Boolean(store.contentPage.data.filter((video) => video.isActive).length),
    pickedVideos: store.contentPage.data.filter((video) => video.isActive),
  }));
  const pickedCount = pickedVideos.length;

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
        {/* <div className={styles[isNeedExtendedMeny ? 'extended-menu-open' : 'extended-menu-closed']}>
          <div className={clsx(styles['extended-menu-body'], { [styles.displaynone]: !isNeedExtendedMeny })}>
            <div className={styles['picked-count']}>{`Picked ${pickedCount} ${
              pickedCount > 1 ? 'videos' : 'video'
            }`}</div>
            <div className={styles['extented-segment']}>
              <Icon name={IconName.DELETE} color={IconColor.WHITE} />
              <div className={styles['extented-segment-title']}>Delete picked videos</div>
            </div>
          </div>
        </div> */}
        <table className={styles['table']}>
          <tr>
            <th>
              <input checked={isChecked} onChange={checkAllHanler} type="checkbox" className={styles['checkbox']} />
            </th>
            <th>
              <div className={styles['extended-menu']}>
                <div className={styles['extended-menu-segment']}>Video</div>
                <div className={clsx(styles['extented-menu-segment'], { [styles.displaynone]: !isNeedExtendedMenu })}>
                  <Eye />
                </div>
                <div className={clsx(styles['extented-menu-segment'], { [styles.displaynone]: !isNeedExtendedMenu })}>
                  <Icon name={IconName.DELETE} color={IconColor.GRAY} />
                </div>
              </div>
            </th>
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
