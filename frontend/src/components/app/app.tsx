import { FC } from 'common/types/types';
import { AppRoutes } from 'common/enums/enums';
import { useLocation, useEffect, useAppDispatch } from 'hooks/hooks';
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
import { AccountVerificationPage } from 'pages/account-verification-page/account-verification-page';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const hasToken = Boolean(tokensStorageService.getTokens().accessToken);

  const isHaveHeader = isRouteHaveHeader(pathname);

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadCurrentUser());
    }
  }, [hasToken, dispatch]);

  return (
    <>
      <ReactNotifications />
      {isHaveHeader && (
        <Routes>
          <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
          <Route path={AppRoutes.SIGN_IN} element={<SignInPage />} />
          <Route path={AppRoutes.RESTORE_PASSWORD_INIT} element={<RestorePasswordPage />} />
          <Route path={AppRoutes.ACCOUNT_VERIFICATION_CONFIRM} element={<AccountVerificationPage />} />
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
