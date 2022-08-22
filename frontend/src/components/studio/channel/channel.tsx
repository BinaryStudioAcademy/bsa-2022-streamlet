import { FC } from 'common/types/types';

import styles from './styles.module.scss';

const StudioChannel: FC = () => {
  return (
    <div className={styles['studio']}>
      <h1 className={styles['header']}>Your channel</h1>
      <h1 className={styles['body']}></h1>
    </div>
  );
};
export { StudioChannel };
