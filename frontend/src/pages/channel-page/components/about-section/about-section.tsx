import { getUserDisplayName } from 'helpers/user';
import { useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import styles from './styles.module.scss';

const AboutSection: FC = () => {
  const aboutInfo = useAppSelector((state) => {
    const data = state.channel.currentChannel.data;
    return data
      ? {
          firstName: data.authorInfo.firstName,
          lastName: data.authorInfo.lastName,
          username: data.authorInfo.username,
          createdAt: data.createdAt,
          description: data.description,
        }
      : data;
  });
  if (!aboutInfo) {
    return null;
  }

  const overviewData = useAppSelector((state) => state.stats.channelStats.overview.data);

  const authorNameDisplay = getUserDisplayName({
    userName: aboutInfo.username,
    firstName: aboutInfo.firstName,
    lastName: aboutInfo.lastName,
  });

  return (
    <section className={styles['about-container']}>
      {aboutInfo.description && (
        <section>
          <h3 className={styles['heading']}>Description</h3>
          <hr className={styles['hr']}></hr>
          <p>{aboutInfo.description}</p>
        </section>
      )}
      <section>
        <h3 className={styles['heading']}>Statistics</h3>
        <hr className={styles['hr']}></hr>
        <ul className={styles['statistics-list']}>
          <li>
            <>
              <span className={styles['heading']}>{'Joined '}</span>
              {new Date(aboutInfo.createdAt).toDateString()}
            </>
          </li>
          {overviewData?.videos !== undefined && (
            <li>
              <>
                {overviewData.videos.toLocaleString()}
                <span className={styles['heading']}>{' videos'}</span>
              </>
            </li>
          )}
          {overviewData?.views !== undefined && (
            <li>
              <>
                {overviewData.views.toLocaleString()}
                <span className={styles['heading']}>{' views'}</span>
              </>
            </li>
          )}
        </ul>
      </section>

      <section>
        <h3 className={styles['heading']}>Creator</h3>
        <hr className={styles['hr']}></hr>
        <p>{authorNameDisplay}</p>
      </section>
    </section>
  );
};

export { AboutSection };
