import { FC } from 'common/types/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './styles.module.scss';

const VideoSkeleton: FC = () => {
  return (
    <div className={styles['wrapper']}>
      <Skeleton className={styles['poster']} />
      <div className={styles['top-part']}>
        <Skeleton className={styles['avatar']} circle width={40} height={40} />
        <div className={styles['right-block']}>
          <Skeleton className={styles['name']} />
          <Skeleton className={styles['title']} />
        </div>
      </div>
    </div>
  );
};

export { VideoSkeleton };
