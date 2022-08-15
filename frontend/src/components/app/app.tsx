import { FC } from 'common/types/types';
import { MainPage } from 'pages/main-page';
import { Auth } from 'components/auth/auth';
import { AppRoute } from 'common/enums/enums';
import { useLocation } from 'react-router-dom';
import { NotFound } from '../not-found-page/not-found';
import { Routes, Route } from 'components/common/common';
import { isRouteHaveHeader } from 'helpers/routes/is-route-have-header';
import { HeaderContainer } from 'components/common/header/header-container';
import { SidebarContainer } from 'components/common/sidebar/sidebar-container';
import { ConfirmationModalTest } from './tests/confirmation-modal/confirmation-modal';

import styles from './app.module.scss';

const App: FC = () => {
  const { pathname } = useLocation();
  const isHaveHeader = isRouteHaveHeader(pathname);

  return (
    <>
      {isHaveHeader && (
        <Routes>
          <Route path={AppRoute.SIGN_UP} element={<Auth />} />
          <Route path={AppRoute.SIGN_IN} element={<Auth />} />
          <Route path={AppRoute.RESTORE_PASSWORD} element={<Auth />} />
        </Routes>
      )}
      {!isHaveHeader && (
        <div className={styles['layout-wrapper']}>
          <HeaderContainer />
          <section className={styles['content-section']}>
            <SidebarContainer />
            <div className={styles['main-content']}>
              <Routes>
                <Route path={AppRoute.ROOT} element={<MainPage />} />
                <Route path={AppRoute.HISTORY} element="History" />
                <Route path={AppRoute.FOLLOWING} element="Following" />
                <Route path={AppRoute.BROWSE} element="Browse" />
                <Route path={AppRoute.ANY} element={<NotFound />} />
                <Route path={'test/confirmationModal/'} element={<ConfirmationModalTest />} />
              </Routes>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export { App };
