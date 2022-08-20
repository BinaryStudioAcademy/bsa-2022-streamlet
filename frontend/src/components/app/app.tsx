import { FC } from 'common/types/types';
import { MainPage } from 'pages/main-page';
import { AppRoutes } from 'common/enums/enums';
import { Routes, Route, HeaderContainer } from 'components/common/common';
import { useLocation } from 'react-router-dom';
import { Search } from 'components/search/search';
import { SidebarContainer } from 'components/common/sidebar/sidebar-container';
import { isRouteHaveHeader } from 'helpers/routes/is-route-have-header';
import { NotFound } from '../not-found-page/not-found';
import { ConfirmationModalTest } from './tests/confirmation-modal/confirmation-modal';
import { Studio, StudioAnalytics } from '../studio';
import { RestorePasswordPage, SignInPage, SignUpPage } from 'components/auth/auth';
import { VideoCardTest } from './tests/video-card/video-card';
import { VideoPageContainer } from 'pages/video/video-page-container';

import styles from './app.module.scss';

const App: FC = () => {
  const { pathname } = useLocation();
  const isHaveHeader = isRouteHaveHeader(pathname);

  return (
    <>
      {isHaveHeader && (
        <Routes>
          <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
          <Route path={AppRoutes.SIGN_IN} element={<SignInPage />} />
          <Route path={AppRoutes.RESTORE_PASSWORD_INIT} element={<RestorePasswordPage />} />
        </Routes>
      )}
      {!isHaveHeader && (
        <div className={styles['layout-wrapper']}>
          <HeaderContainer />
          <section className={styles['content-section']}>
            <SidebarContainer />
            <div className={styles['main-content']}>
              <Routes>
                <Route path={AppRoutes.ROOT} element={<MainPage />} />
                <Route path="/browse/some-path" element={<MainPage />} />
                <Route path={AppRoutes.SEARCH} element={<Search />} />
                <Route path={AppRoutes.HISTORY} element="History" />
                <Route path={AppRoutes.FOLLOWING} element="Following" />
                <Route path={AppRoutes.BROWSE} element="Browse" />
                <Route path={AppRoutes.ANY} element={<NotFound />} />
                <Route path={'test/confirmationModal/'} element={<ConfirmationModalTest />} />
                <Route path={'test/video-card-main-page'} element={<VideoCardTest />} />
                <Route path={AppRoutes.STUDIO} element={<Studio />} />
                <Route path={AppRoutes.ANALYTICS} element={<StudioAnalytics />} />
                <Route path="video-page" element={<VideoPageContainer />} />
              </Routes>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export { App };
