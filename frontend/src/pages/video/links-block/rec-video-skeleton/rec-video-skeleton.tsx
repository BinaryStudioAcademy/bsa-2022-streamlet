import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './styles.module.scss';

const RecVideoSkeleton: FC = () => {
  return (
    <div className={styles['wrapper']}>
      <Skeleton className={styles['poster']} />
      <div className={styles['right-block']}>
        <Skeleton className={styles['name']} />
        <Skeleton className={styles['title']} />
      </div>
    </div>
  );
};

export { RecVideoSkeleton };
