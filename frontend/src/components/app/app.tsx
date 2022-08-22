import { FC } from 'common/types/types';
import { MainPage } from 'pages/main-page';
import { AppRoute } from 'common/enums/enums';
import { Routes, Route, HeaderContainer } from 'components/common/common';
import { useLocation } from 'react-router-dom';
import { Search } from 'components/search/search';
import { SidebarContainer } from 'components/common/sidebar/sidebar-container';
import { NotFound } from '../not-found-page/not-found';
import { ConfirmationModalTest } from './tests/confirmation-modal/confirmation-modal';
import { StudioHome, StudioAnalytics, StudioSidebar } from '../studio';
import { RestorePasswordPage, SignInPage, SignUpPage } from 'components/auth/auth';
import { ProfilePreferencesPage } from '../../pages/profile-preferences-page/profile-preferences-page';
import { VideoCardTest } from './tests/video-card/video-card';
import { VideoPageContainer } from 'pages/video/video-page-container';
import { isRouteHasDefaultNavigation, isRouteHasStudioNavigation } from 'helpers/helpers';

import styles from './app.module.scss';
import { ProtectedRoute } from 'components/common/protected-route/protected-route';
import { StudioChannel } from 'components/studio/channel/channel';
import { StudioStream } from 'components/studio/stream';

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
        <div className={styles['studio-content-section']}>
          <StudioSidebar />
          <div className={styles['main-content']}>
            <Routes>
              <Route path={AppRoute.STUDIO} element={<ProtectedRoute element={<StudioHome />} />} />
              <Route path={AppRoute.STUDIO_CHANNEL} element={<ProtectedRoute element={<StudioChannel />} />} />
              <Route path={AppRoute.STUDIO_ANALYTICS} element={<ProtectedRoute element={<StudioAnalytics />} />} />
              <Route path={AppRoute.STUDIO_STREAM_$ID} element={<ProtectedRoute element={<StudioStream />} />} />
            </Routes>
          </div>
        </div>
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
                <Route
                  path={AppRoute.PROFILE_PREFERENCE}
                  element={<ProtectedRoute element={<ProfilePreferencesPage />} />}
                />
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
