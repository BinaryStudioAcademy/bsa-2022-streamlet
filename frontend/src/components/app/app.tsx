import { FC } from 'common/types/types';
import { AppRoutes, AppTheme } from 'common/enums/enums';
import { useLocation, useEffect, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { tokensStorageService } from 'services/services';
import { authActions } from 'store/actions';
import { MainPageContainer } from 'pages/main-page/main-page-container';
import { Routes, Route, HeaderContainer, SidebarContainer } from 'components/common/common';
import { RestorePasswordPage, SignInPage, SignUpPage } from 'components/auth/auth';
import { Search } from 'components/search/search';
import { NotFound } from 'components/not-found-page/not-found';
import { ReactNotifications } from 'react-notifications-component';
import { ConfirmationModalTest } from './tests/confirmation-modal/confirmation-modal';
import { StudioHome, StudioAnalytics, StudioSidebar, StudioChannel } from '../../pages/studio';
import { VideoCardTest } from './tests/video-card/video-card';
import { VideoPageContainer } from 'pages/video/video-page-container';
import { ProtectedRoute } from 'components/common/protected-route/protected-route';
import { AccountVerificationConfirmPage } from 'pages/account-verification-page/account-verification-confirm-page';
import { RestorePasswordConfirmPage } from 'pages/restore-password-confirm-page/restore-password-confirm-page';
import { ChannelPage } from 'pages/channel-page/channel-page';
import { ProfilePreferencesPage } from 'pages/profile-preferences-page/profile-preferences-page';
import { isRouteHasDefaultNavigation, isRouteHasStudioNavigation } from 'helpers/helpers';

import styles from './app.module.scss';
import { AccountVerificationInitPage } from 'pages/account-verification-page/account-verification-init-page';
import { StreamChatTest } from './tests/stream-chat/stream-chat';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const hasToken = Boolean(tokensStorageService.getTokens().accessToken);

  const isHasDefaultNavigation = isRouteHasDefaultNavigation(pathname);
  const isHasStudioNavigation = isRouteHasStudioNavigation(pathname);

  const { theme: isLightTheme } = useAppSelector((state) => ({
    theme: state.theme.isLightTheme,
  }));

  useEffect(() => {
    document.body.dataset.theme = isLightTheme ? AppTheme.LIGHT : '';
  }, [isLightTheme]);

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadCurrentUser());
    }
  }, [hasToken, dispatch]);

  return (
    <>
      <ReactNotifications />
      {!isHasDefaultNavigation && !isHasStudioNavigation && (
        <Routes>
          <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
          <Route path={AppRoutes.SIGN_IN} element={<SignInPage />} />
          <Route path={AppRoutes.RESTORE_PASSWORD_INIT} element={<RestorePasswordPage />} />
          <Route path={AppRoutes.ACCOUNT_VERIFICATION_CONFIRM} element={<AccountVerificationConfirmPage />} />
          <Route path={AppRoutes.ACCOUNT_VERIFICATION_INIT} element={<AccountVerificationInitPage />} />
          <Route path={AppRoutes.RESTORE_PASSWORD_CONFIRM} element={<RestorePasswordConfirmPage />} />
        </Routes>
      )}
      {isHasStudioNavigation && (
        <div className={styles['studio-content-section']}>
          <StudioSidebar />
          <div className={styles['main-content']}>
            <Routes>
              <Route path={AppRoutes.STUDIO} element={<ProtectedRoute element={<StudioHome />} />} />
              <Route path={AppRoutes.STUDIO_CHANNEL} element={<ProtectedRoute element={<StudioChannel />} />} />
              <Route path={AppRoutes.STUDIO_ANALYTICS} element={<ProtectedRoute element={<StudioAnalytics />} />} />
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
                <Route path={AppRoutes.ROOT} element={<MainPageContainer />} />
                <Route path={AppRoutes.SEARCH} element={<Search />} />
                <Route path={AppRoutes.HISTORY} element="History" />
                <Route path={AppRoutes.FOLLOWING} element="Following" />
                <Route path={AppRoutes.BROWSE} element="Browse" />
                <Route
                  path={AppRoutes.PROFILE_PREFERENCE}
                  element={<ProtectedRoute element={<ProfilePreferencesPage />} />}
                />
                <Route path={'test/confirmationModal/'} element={<ConfirmationModalTest />} />
                <Route path={'test/video-card-main-page'} element={<VideoCardTest />} />
                <Route path={'test/stream-chat'} element={<StreamChatTest />} />
                <Route path="video-page" element={<VideoPageContainer />} />
                <Route path={AppRoutes.CHANNEL_$ID} element={<ChannelPage />} />
                <Route path={AppRoutes.ANY} element={<NotFound />} />
              </Routes>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export { App };
