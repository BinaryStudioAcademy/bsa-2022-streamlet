import React, { FC } from 'react';
import { VideoPrivacy, VideoStatus } from 'shared/build';
import { VideoRow } from './common/video-row';
import styles from './styles.module.scss';

export const StudioContent: FC = () => {
  return (
    <div className={styles['studio']}>
      <h1 className={styles['header']}>Channel content</h1>
      <div className={styles['body']}>
        <table className={styles['table']}>
          <tr>
            <th>
              <input type="checkbox" className={styles['checkbox']} />
            </th>
            <th>Video</th>
            <th>Visibility</th>
            <th>Date</th>
            <th>Views</th>
            <th>Comments</th>
            <th>Likes / Dislikes</th>
          </tr>
          <VideoRow
            name={'Meet the CEO: Artem Goncharov (Binary Studio Official Video)'}
            description={
              'In this video, our CEO Artem Goncharov talks about our different types of services and explains how Binary Studio delivers business value to customers by fostering strategic long-term partnerships.'
            }
            id={'121'}
            duration={60}
            status={VideoStatus.FINISHED}
            poster={'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663154889/stream-poster/hqdefault_xcwdea.webp'}
            privacy={VideoPrivacy.UNLISTED}
            publishedAt={'2022 02 19'}
            viewsCount={20}
            commentsCount={10}
            likeCount={3}
            dislikeCount={1}
          />
          <VideoRow
            name={'Meet the CEO: Artem Goncharov (Binary Studio Official Video)'}
            description={
              'In this video, our CEO Artem Goncharov talks about our different types of services and explains how Binary Studio delivers business value to customers by fostering strategic long-term partnerships.'
            }
            id={'121'}
            duration={200}
            status={VideoStatus.FINISHED}
            poster={'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663154889/stream-poster/hqdefault_xcwdea.webp'}
            privacy={VideoPrivacy.PRIVATE}
            publishedAt={'2022 02 19'}
            viewsCount={20}
            commentsCount={10}
            likeCount={3}
            dislikeCount={1}
          />
          <VideoRow
            name={'Meet the CEO: Artem Goncharov (Binary Studio Official Video)'}
            description={
              'In this video, our CEO Artem Goncharov talks about our different types of services and explains how Binary Studio delivers business value to customers by fostering strategic long-term partnerships.'
            }
            id={'121'}
            duration={323}
            status={VideoStatus.FINISHED}
            poster={'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663154889/stream-poster/hqdefault_xcwdea.webp'}
            privacy={VideoPrivacy.PUBLIC}
            publishedAt={'2022 02 19'}
            viewsCount={20}
            commentsCount={10}
            likeCount={3}
            dislikeCount={1}
          />
          <VideoRow
            name={'Meet the CEO: Artem Goncharov (Binary Studio Official Video)'}
            description={
              'In this video, our CEO Artem Goncharov talks about our different types of services and explains how Binary Studio delivers business value to customers by fostering strategic long-term partnerships.'
            }
            id={'121'}
            duration={60}
            status={VideoStatus.FINISHED}
            poster={'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663154889/stream-poster/hqdefault_xcwdea.webp'}
            privacy={VideoPrivacy.UNLISTED}
            publishedAt={'2022 02 19'}
            viewsCount={20}
            commentsCount={10}
            likeCount={3}
            dislikeCount={1}
          />
          <VideoRow
            name={'Meet the CEO: Artem Goncharov (Binary Studio Official Video)'}
            description={
              'In this video, our CEO Artem Goncharov talks about our different types of services and explains how Binary Studio delivers business value to customers by fostering strategic long-term partnerships.'
            }
            id={'121'}
            duration={23}
            status={VideoStatus.FINISHED}
            poster={'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663154889/stream-poster/hqdefault_xcwdea.webp'}
            privacy={VideoPrivacy.UNLISTED}
            publishedAt={'2022 02 19'}
            viewsCount={20}
            commentsCount={10}
            likeCount={3}
            dislikeCount={1}
          />
        </table>
      </div>
    </div>
  );
};
