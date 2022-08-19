import { FC } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { useLocation, useAppSelector, useEffect, useAppDispatch } from 'hooks/hooks';
import { tokensStorageService } from 'services/services';
import { authActions } from 'store/actions';
import { MainPage } from 'pages/main-page';
import { Routes, Route, HeaderContainer, SidebarContainer } from 'components/common/common';
import { RestorePasswordPage, SignInPage, SignUpPage } from 'components/auth/auth';
import { Studio, StudioAnalytics } from 'components/studio';
import { Search } from 'components/search/search';
import { NotFound } from 'components/not-found-page/not-found';
import { ReactNotifications } from 'react-notifications-component';
import { isRouteHaveHeader } from 'helpers/routes/is-route-have-header';
import { ConfirmationModalTest } from './tests/confirmation-modal/confirmation-modal';
import { VideoCardTest } from './tests/video-card/video-card';
import { VideoPageContainer } from 'pages/video/video-page-container';

import styles from './app.module.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));

  const hasToken = Boolean(tokensStorageService.getTokens().accessToken);
  const hasUser = Boolean(user);

  const isHaveHeader = isRouteHaveHeader(pathname);

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadCurrentUser());
    }
  }, [hasToken, hasUser, dispatch]);

  return (
    <>
      <ReactNotifications />
      {isHaveHeader && (
        <Routes>
          <Route path={AppRoute.SIGN_UP} element={<SignUpPage />} />
          <Route path={AppRoute.SIGN_IN} element={<SignInPage />} />
          <Route path={AppRoute.RESTORE_PASSWORD} element={<RestorePasswordPage />} />
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
                <Route path="/browse/some-path" element={<MainPage />} />
                <Route path={AppRoute.SEARCH} element={<Search />} />
                <Route path={AppRoute.HISTORY} element="History" />
                <Route path={AppRoute.FOLLOWING} element="Following" />
                <Route path={AppRoute.BROWSE} element="Browse" />
                <Route path={AppRoute.ANY} element={<NotFound />} />
                <Route path={'test/confirmationModal/'} element={<ConfirmationModalTest />} />
                <Route path={'test/video-card-main-page'} element={<VideoCardTest />} />
                <Route path={AppRoute.STUDIO} element={<Studio />} />
                <Route path={AppRoute.ANALYTICS} element={<StudioAnalytics />} />
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
