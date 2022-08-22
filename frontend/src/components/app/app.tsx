import { FC } from 'common/types/types';
import { MainPage } from 'pages/main-page';
import { AppRoute } from 'common/enums/enums';
import { Routes, Route, HeaderContainer } from 'components/common/common';
import { useLocation } from 'react-router-dom';
import { Search } from 'components/search/search';
import { SidebarContainer } from 'components/common/sidebar/sidebar-container';
import { NotFound } from '../not-found-page/not-found';
import { ConfirmationModalTest } from './tests/confirmation-modal/confirmation-modal';
import { Studio, StudioAnalytics } from '../studio';
import { RestorePasswordPage, SignInPage, SignUpPage } from 'components/auth/auth';
import { VideoCardTest } from './tests/video-card/video-card';
import { VideoPageContainer } from 'pages/video/video-page-container';
import { isRouteHasDefaultNavigation, isRouteHasStudioNavigation } from 'helpers/helpers';

import styles from './app.module.scss';

const App: FC = () => {
  const { pathname } = useLocation();
  const isHasDefaultNavigation = isRouteHasDefaultNavigation(pathname);
  const isHasStudioNavigation = isRouteHasStudioNavigation(pathname);

  return (
    <>
      {!isHasDefaultNavigation && !isHasStudioNavigation && (
        <Routes>
          <Route path={AppRoute.SIGN_UP} element={<SignUpPage />} />
          <Route path={AppRoute.SIGN_IN} element={<SignInPage />} />
          <Route path={AppRoute.RESTORE_PASSWORD} element={<RestorePasswordPage />} />
        </Routes>
      )}
      {isHasStudioNavigation && (
        <Routes>
          <Route path={AppRoute.STUDIO} element={<Studio />} />
          <Route path={AppRoute.STUDIO_ANALYTICS} element={<StudioAnalytics />} />
        </Routes>
      )}
      {isHasDefaultNavigation && (
        <div className={styles['layout-wrapper']}>
          <HeaderContainer />
          <section className={styles['content-section']}>
            <SidebarContainer />
            <div className={styles['main-content']}>
              <Routes>
                <Route path={AppRoute.ROOT} element={<MainPage />} />
                <Route path="/browse/some-path" element={<MainPage />} />
                <Route path={AppRoute.SEARCH} element={<Search />} />
                <Route path={AppRoute.HISTORY} element="History" />
                <Route path={AppRoute.FOLLOWING} element="Following" />
                <Route path={AppRoute.BROWSE} element="Browse" />
                <Route path={'test/confirmationModal/'} element={<ConfirmationModalTest />} />
                <Route path={'test/video-card-main-page'} element={<VideoCardTest />} />
                <Route path="video-page" element={<VideoPageContainer />} />
                <Route path={AppRoute.ANY} element={<NotFound />} />
              </Routes>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export { App };
