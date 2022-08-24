import { FC } from 'common/types/types';

import styles from './styles.module.scss';

const StudioAnalytics: FC = () => {
  return (
    <div className={styles['studio']}>
      <h1 className={styles['header']}>Analytics</h1>
      <h1 className={styles['body']}></h1>
    </div>
  );
};
export { StudioAnalytics };
