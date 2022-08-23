import { useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import styles from './styles.module.scss';

const AboutSection: FC = () => {
  const aboutInfo = useAppSelector((state) => {
    const data = state.channelPage.currentChannel.data;
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

  let authorNameDisplay = aboutInfo.username;

  let combinedFirstLastName = '';
  if (aboutInfo.firstName && aboutInfo.lastName) {
    combinedFirstLastName = `${aboutInfo.firstName}, ${aboutInfo.lastName}`;
  } else if (aboutInfo.firstName) {
    combinedFirstLastName = aboutInfo.firstName;
  } else if (aboutInfo.lastName) {
    combinedFirstLastName = aboutInfo.lastName;
  }
  authorNameDisplay = authorNameDisplay + (combinedFirstLastName ? ` (${combinedFirstLastName})` : '');

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
              <h4 className={styles['heading']}>Created:</h4>
              {new Date(aboutInfo.createdAt).toDateString()}
            </>
          </li>
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
