import { Tooltip } from 'components/common/common';
import { useAppDispatch, useAppSelector, useWindowDimensions } from 'hooks/hooks';
import React, { FC, useEffect } from 'react';
import { getMyVideos, unloadVideos } from 'store/content-page/actions';
import { VideoRow } from './common/video-row';
import styles from './styles.module.scss';

export const StudioContent: FC = () => {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { videos } = useAppSelector((store) => ({
    videos: store.contentPage.data,
  }));

  useEffect(() => {
    dispatch(getMyVideos());
    return () => {
      dispatch(unloadVideos());
    };
  }, [dispatch]);
  return (
    <div className={styles['studio']}>
      <Tooltip isLightTheme={false} />
      <h1 className={styles['header']}>Channel content</h1>
      <div className={styles['body']}>
        <table className={styles['table']}>
          <tr>
            <th>
              <input type="checkbox" className={styles['checkbox']} />
            </th>
            <th>Video</th>
            <th data-tip={width >= 1300 ? '' : 'Visibility'}>Visibility</th>
            <th data-tip={width >= 1300 ? '' : 'Date'}>Date</th>
            <th data-tip={width >= 1300 ? '' : 'Views'}>Views</th>
            <th data-tip={width >= 1300 ? '' : 'Comments'}>Comments</th>
            <th data-tip={width >= 1300 ? '' : 'Likes / Dislikes'}>{width >= 1300 ? 'Likes / Dislikes' : 'L/D'}</th>
          </tr>
          {videos.map((video) => (
            <VideoRow {...video} key={video.id} />
          ))}
          {/* {videos.map((video) => (
            <VideoRow {...video} key={video.id} />
          ))}
          {videos.map((video) => (
            <VideoRow {...video} key={video.id} />
          ))} */}
        </table>
      </div>
    </div>
  );
};
