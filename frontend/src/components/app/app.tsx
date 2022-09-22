import { FC } from 'common/types/types';
import { AppRoutes, AppTheme, SizesWindow, SocketEvents } from 'common/enums/enums';
import { useLocation, useEffect, useAppDispatch, useAppSelector, useWindowDimensions } from 'hooks/hooks';
import { tokensStorageService } from 'services/services';
import { authActions, socketActions } from 'store/actions';
import { MainPageContainer } from 'pages/main-page/main-page-container';
import { Routes, Route, HeaderContainer, SidebarContainer, Tooltip } from 'components/common/common';
import { RestorePasswordPage, SignInPage, SignUpPage } from 'components/auth/auth';
import { Search } from 'components/search/search';
import { NotFound } from 'components/placeholder-page/not-found';
import { ReactNotifications } from 'react-notifications-component';
import { ConfirmationModalTest } from './tests/confirmation-modal/confirmation-modal';
import { StudioAnalytics, StudioSidebar, StudioChannel, StudioContent } from '../../pages/studio';
import { VideoCardTest } from './tests/video-card/video-card';
import { VideoPageContainer } from 'pages/video/video-page-container';
import { ProtectedRoute } from 'components/common/protected-route/protected-route';
import { AccountVerificationConfirmPage } from 'pages/account-verification-page/account-verification-confirm-page';
import { RestorePasswordConfirmPage } from 'pages/restore-password-confirm-page/restore-password-confirm-page';
import { ChannelPage } from 'pages/channel-page/channel-page';
import { ProfilePreferencesPage } from 'pages/profile-preferences-page/profile-preferences-page';
import { isRouteHasDefaultNavigation, isRouteHasStudioNavigation } from 'helpers/helpers';
import { GoogleAuthorization } from 'components/auth/components/common/social-buttons/google-button/google-authorization';
import { HistoryPage } from '../../pages/history-page/history-page';
import { AccountVerificationInitPage } from 'pages/account-verification-page/account-verification-init-page';
import { LiveChat } from 'pages/live-chat/live-chat';
import { FollowingPage } from 'pages/following-page/following-page';
import { Navigate } from 'react-router-dom';
import { OverviewTab } from 'pages/following-page/tabs/overview/overview-tab';
import { LiveVideosTab } from 'pages/following-page/tabs/live-videos/live-videos-tab';
import { OfflineVideosTab } from 'pages/following-page/tabs/offline-videos/offline-videos-tab';
import { Tab as FollowingTab } from 'pages/following-page/tabs/tab';
import { Tab as StreamTab } from 'pages/studio/stream/stream/tabs/tabs';
import { BrowsePage } from '../../pages/browse-page/browse-page';
import { closeSidebar } from 'store/layout/actions';
import { ScrollToTop } from './scroll-to-top';
import { socket } from 'common/config/config';
import { store } from 'store/store';
import { StudioHomeContainer } from 'pages/studio/home/home-container';
import { ViewsTab } from 'pages/studio/analytics/tabs/views/views-tab';
import { OverviewTab as OverviewAnalyticsTab } from 'pages/studio/analytics/tabs/overview/overview-tab';
import { FollowersTab } from 'pages/studio/analytics/tabs/followers/followers-tab';
import { Tab as AnalyticsTab } from 'pages/studio/analytics/tabs/tab';

import styles from './app.module.scss';
import { loadPreferences } from 'store/preferences/actions';
import { LiveSettings } from 'pages/studio/stream/stream/tabs/live-settings/live-settings';
// import { LiveAnalytics } from 'pages/studio/stream/stream/tabs/live-analytics/live-analytics';
import { getUserStreamPermission } from 'store/auth/actions';
import { WatchTimeTab } from 'pages/studio/analytics/tabs/watch-time/watch-time-tab';

socket.on(SocketEvents.socket.HANDSHAKE_DONE, ({ id }: { id: string }) => {
  store.dispatch(socketActions.addSocketId(id));
});

// do not move into App function, since array will be recreated on every render,
// and it's used in useEffect
const scrollToTopQuerySelectors = [`.${styles['main-content']}`];

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width <= SizesWindow.SIZE_FOR_HIDDEN_SIDEBAR) {
      dispatch(closeSidebar());
    }
  }, [width, dispatch, pathname]);

  const hasToken = Boolean(tokensStorageService.getTokens().accessToken);

  const isHasDefaultNavigation = isRouteHasDefaultNavigation(pathname);
  const isHasStudioNavigation = isRouteHasStudioNavigation(pathname);

  const { theme: isLightTheme, userId } = useAppSelector((state) => ({
    theme: state.theme.isLightTheme && !pathname.includes('/studio'),
    userId: state.auth.user?.id,
  }));

  useEffect(() => {
    document.body.dataset.theme = isLightTheme ? AppTheme.LIGHT : '';
  }, [isLightTheme]);

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadCurrentUser());
      dispatch(loadPreferences());
      dispatch(getUserStreamPermission());
    }
  }, [hasToken, dispatch]);

  useEffect(() => {
    if (userId) {
      socket.emit(SocketEvents.socket.HANDSHAKE, userId);
    }
    return () => {
      dispatch(socketActions.removeSocketId());
    };
  }, [userId, dispatch]);

  return (
    <>
      <ScrollToTop querySelectors={scrollToTopQuerySelectors} />
      <ReactNotifications />
      {!isHasDefaultNavigation && !isHasStudioNavigation && (
        <Routes>
          <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
          <Route path={AppRoutes.SIGN_IN} element={<SignInPage />} />
          <Route path={AppRoutes.RESTORE_PASSWORD_INIT} element={<RestorePasswordPage />} />
          <Route path={AppRoutes.ACCOUNT_VERIFICATION_CONFIRM} element={<AccountVerificationConfirmPage />} />
          <Route path={AppRoutes.ACCOUNT_VERIFICATION_INIT} element={<AccountVerificationInitPage />} />
          <Route path={AppRoutes.RESTORE_PASSWORD_CONFIRM} element={<RestorePasswordConfirmPage />} />
          <Route path={AppRoutes.LIVE_CHAT} element={<LiveChat />} />
        </Routes>
      )}
      {isHasStudioNavigation && (
        <div className={styles['studio-content-section']}>
          <Tooltip isLightTheme={isLightTheme} />
          <StudioSidebar />
          <div className={styles['main-content']}>
            <Routes>
              <Route path={AppRoutes.STUDIO} element={<ProtectedRoute element={<StudioHomeContainer />} />}>
                <Route index element={<LiveSettings />} />
                <Route path={StreamTab.SETTINGS} element={<LiveSettings />} />
                {/* <Route path={StreamTab.ANALYTICS} element={<LiveAnalytics />} /> */}
                <Route path="*" element={<Navigate to={`${AppRoutes.STUDIO}/${StreamTab.SETTINGS}`} replace />} />
              </Route>
              <Route path={AppRoutes.STUDIO_CHANNEL} element={<ProtectedRoute element={<StudioChannel />} />} />
              <Route path={AppRoutes.STUDIO_CONTENT} element={<ProtectedRoute element={<StudioContent />} />} />
              <Route path={AppRoutes.STUDIO_ANALYTICS} element={<ProtectedRoute element={<StudioAnalytics />} />}>
                <Route index element={<OverviewAnalyticsTab />} />
                <Route path={AnalyticsTab.OVERVIEW} element={<OverviewAnalyticsTab />} />
                <Route path={AnalyticsTab.VIEWS} element={<ViewsTab />} />
                <Route path={AnalyticsTab.WATCH_TIME} element={<WatchTimeTab />} />
                <Route path={AnalyticsTab.FOLLOWERS} element={<FollowersTab />} />
                <Route
                  path="*"
                  element={<Navigate to={`${AppRoutes.STUDIO_ANALYTICS}/${AnalyticsTab.OVERVIEW}`} replace />}
                />
              </Route>
              <Route path={AppRoutes.ANY} element={<NotFound />} />
            </Routes>
          </div>
        </div>
      )}
      {isHasDefaultNavigation && (
        <div className={styles['layout-wrapper']}>
          <Tooltip isLightTheme={isLightTheme} />
          <HeaderContainer />
          <section className={styles['content-section']}>
            <SidebarContainer />
            <div id="main-content" className={styles['main-content']}>
              <Routes>
                <Route path={AppRoutes.ROOT} element={<MainPageContainer />} />
                <Route path={AppRoutes.SEARCH} element={<Search />} />
                <Route path={AppRoutes.HISTORY} element={<HistoryPage />} />
                <Route path={AppRoutes.FOLLOWING} element={<ProtectedRoute element={<FollowingPage />} />}>
                  <Route index element={<OverviewTab />} />
                  <Route path={FollowingTab.OVERVIEW} element={<OverviewTab />} />
                  <Route path={FollowingTab.LIVE} element={<LiveVideosTab />} />
                  <Route path={FollowingTab.OFFLINE} element={<OfflineVideosTab />} />
                  <Route
                    path="*"
                    element={<Navigate to={`${AppRoutes.FOLLOWING}/${FollowingTab.OVERVIEW}`} replace />}
                  />
                </Route>

                <Route path={AppRoutes.BROWSE} element={<BrowsePage />} />
                <Route path={AppRoutes.GOOGLE_ATHORIZATION} element={<GoogleAuthorization query={search} />} />
                <Route
                  path={AppRoutes.PROFILE_PREFERENCE}
                  element={<ProtectedRoute element={<ProfilePreferencesPage />} />}
                />
                <Route path={'test/confirmationModal/'} element={<ConfirmationModalTest />} />
                <Route path={'test/video-card-main-page'} element={<VideoCardTest />} />
                <Route path={AppRoutes.CHANNEL_$ID} element={<ChannelPage />} />
                <Route path={AppRoutes.VIDEO_$ID} element={<VideoPageContainer />} />
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
