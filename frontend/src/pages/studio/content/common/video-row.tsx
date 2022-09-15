import { getFormatDurationString } from 'helpers/helpers';
import React, { FC } from 'react';
import { VideoInfoDto } from 'shared/build';
import styles from './styles.module.scss';

export const VideoRow: FC<VideoInfoDto> = ({
  name,
  description,
  poster,
  privacy,
  publishedAt,
  viewsCount,
  commentsCount,
  likeCount,
  dislikeCount,
  duration,
}) => {
  return (
    <tr>
      <th>
        <input className={styles['checkbox']} type="checkbox" />
      </th>
      <th>
        <div className={styles['video-container']}>
          <div className={styles['video-preview-container']}>
            <img src={poster} alt="image-poster" className={styles['video-preview-poster']} />
            <div className={styles['video-labels']}>
              {duration !== null && (
                <label className={styles['video-duration-label']}>{getFormatDurationString(duration)}</label>
              )}
            </div>
          </div>
          <div className={styles['video-info']}>
            <div className={styles['video-info-segment']}>{name}</div>
            <div className={styles['video-info-segment']}>{description}</div>
          </div>
        </div>
      </th>
      <th>{privacy}</th>
      <th>{publishedAt}</th>
      <th>{viewsCount}</th>
      <th>{commentsCount}</th>
      <th>
        {likeCount} / {dislikeCount}
      </th>
    </tr>
  );
};
