import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route, Sidebar } from 'components/common/common';
import { Auth } from 'components/auth/auth';

import styles from './styles.module.scss';

const App: FC = () => {
  return (
    <>
      <header></header>
      <main>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Routes>
            <Route path={AppRoute.ROOT} element="Root page" />
            <Route path={AppRoute.BROWSE} element="Browse page" />
            <Route path={AppRoute.FOLLOWING} element="Following page" />
            <Route path={AppRoute.HISTORY} element="History page" />
            <Route path={AppRoute.CHANNEL_ID} element="Channel id page" />
            <Route path={AppRoute.SIGN_UP} element={<Auth />} />
            <Route path={AppRoute.SIGN_IN} element={<Auth />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export { App };
