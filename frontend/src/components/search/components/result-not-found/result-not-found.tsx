import { FC } from 'common/types/types';
import styles from './styles.module.scss';

const ResultNotFound: FC = () => (
  <div className={styles.container}>
    <div className={styles['result-not-found']}>
      <div className={styles['result-not-found-wrapper']}>
        <div className={styles['result-not-found-title']}>
          <span>No results found</span>
        </div>
        <div className={styles['result-not-found-sub']}>
          <span>Try different keywords or remove search filters</span>
        </div>
      </div>
    </div>
  </div>
);

export { ResultNotFound };
