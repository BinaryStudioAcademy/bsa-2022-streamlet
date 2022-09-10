import clsx from 'clsx';
import { FC } from 'common/types/types';
import { Icon } from '../icon';
import { Link } from '../common';
import { RoutePage } from './route-pages.config';
import { MobileSidebar, MobileSidebarProps } from '../mobile-sidebar/mobile-sidebar';

import styles from './sidebar.module.scss';
import { SidebarSubs } from './sidebar-subs/sidebar-subs';
import { useAppSelector, useLocation } from 'hooks/hooks';
import { AppRoutes } from 'common/enums/enums';
import { matchPath } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeSidebar } from 'store/layout/actions';

interface SidebarProps {
  isSidebarOpen: boolean;
  configRoutePages: RoutePage[];
  activeRouteId: number;
  mobileSidebarProps: MobileSidebarProps;
}

const hiddenSidebarPaths: Readonly<string[]> = [AppRoutes.VIDEO_$ID] as const;

const shouldHideSidebarByDefault = (pathName: string): boolean => {
  return hiddenSidebarPaths.some((pattern) => {
    const match = matchPath(pattern, pathName);
    return match !== null;
  });
};

const Sidebar: FC<SidebarProps> = ({ configRoutePages, activeRouteId, isSidebarOpen, mobileSidebarProps }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [shouldHideSidebar, setShouldHideSidebar] = useState<boolean>(false);

  useLayoutEffect(() => {
    setShouldHideSidebar(shouldHideSidebarByDefault(pathname));
  }, [pathname]);

  useLayoutEffect(() => {
    if (shouldHideSidebar) {
      dispatch(closeSidebar());
    }
  }, [dispatch, shouldHideSidebar]);

  const { hasUser } = useAppSelector((state) => ({
    hasUser: Boolean(state.auth.user),
  }));

  return (
    <>
      <MobileSidebar {...mobileSidebarProps} hasBackupForWideScreen={!shouldHideSidebar} />
      {shouldHideSidebar || (
        <div
          className={clsx(
            {
              [styles.close]: !isSidebarOpen,
            },
            styles.sidebar,
          )}
        >
          <nav className={styles['navigate-menu']}>
            <ul>
              {configRoutePages.map(
                (page) =>
                  (page.authRequired !== true || hasUser) && (
                    <Link
                      key={page.linkTo}
                      to={page.linkTo}
                      className={clsx({ [styles.active]: page.id === activeRouteId })}
                    >
                      <li data-tip={!isSidebarOpen ? page.textLink : ''} data-place="right">
                        <Icon name={page.iconName} width="24" height="24" />
                        <span className={styles['link-name']}>{page.textLink}</span>
                      </li>
                    </Link>
                  ),
              )}
            </ul>
          </nav>
          <div className={styles['divider']} />
          <SidebarSubs className={styles['block-subscription']} promoWrpClassName={styles['sign-in-promo-wrp']} />
        </div>
      )}
    </>
  );
};

export { Sidebar };
