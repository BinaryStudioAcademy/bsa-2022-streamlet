import { FC } from 'common/types/types';

import styles from './main-page.module.scss';

const MainPage: FC = () => {
  return (
    <main className={styles.main}>
      <h1>Main content</h1>
    </main>
  );
};

export { MainPage };
