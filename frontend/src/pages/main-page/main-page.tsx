import { FC } from 'common/types/types';

import styles from './main-page.module.scss';

const MainPage: FC = () => (
  <main className={styles.main}>
    <h1 className={styles.title}>Main page</h1>
  </main>
);

export { MainPage };
