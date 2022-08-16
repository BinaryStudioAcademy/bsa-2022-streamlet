import { FC } from 'common/types/types';
import { HeaderContainer } from 'components/common/header/header-container';

import styles from './main-page.module.scss';

const MainPage: FC = () => {
  return (
    <main className={styles.main}>
      <HeaderContainer />
    </main>
  );
};

export { MainPage };
