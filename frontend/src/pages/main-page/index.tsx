import { FC } from 'common/types/types';
import { HeaderContainer } from 'components/common/header/header-container';
import { Notifications } from 'components/common/notifications';

import styles from './main-page.module.scss';

const MainPage: FC = () => {
  return (
    <main className={styles.main}>
      <HeaderContainer />
      <Notifications />
    </main>
  );
};

export { MainPage };
