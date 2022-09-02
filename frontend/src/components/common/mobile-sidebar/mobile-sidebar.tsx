import clsx from 'clsx';
import { IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from '../common';
import { Icon } from '../icon';
import { Logo } from '../logo/logo';
import { RoutePage } from '../sidebar/route-pages.config';

import styles from './mobile-sidebar.module.scss';
import { SidebarSubs } from '../sidebar/sidebar-subs/sidebar-subs';
import { useAppSelector } from 'hooks/hooks';

export interface MobileSidebarProps {
  isSidebarOpen: boolean;
  configRoutePages: RoutePage[];
  activeRouteId: number;
  closeMobileSidebar: () => void;
  hasBackupForWideScreen?: boolean;
}

const MobileSidebar: FC<MobileSidebarProps> = ({
  isSidebarOpen,
  closeMobileSidebar,
  configRoutePages,
  activeRouteId,
  hasBackupForWideScreen = true,
}) => {
  const hasUser = Boolean(useAppSelector((state) => state.auth.user));

  return (
    <div className={clsx(styles['shadow'], isSidebarOpen && styles['shadow-open'])}>
      <div className={styles['scrim']} onClick={closeMobileSidebar}></div>
      <div
        className={clsx(
          { [styles['open']]: isSidebarOpen, [styles['has-backup-for-wide-screen']]: hasBackupForWideScreen },
          styles['mobile-sidebar'],
        )}
      >
        <div className={styles['sidebar-content']} onClick={(e): void => e.stopPropagation()}>
          <div className={styles['sidebar-header']}>
            <button onClick={closeMobileSidebar} className={styles['burger-menu']}>
              <Icon name={IconName.BURGER_MENU} width="24" height="24" />
            </button>
            <Logo size={24} />
          </div>
          <div className={styles['sidebar-body']}>
            <ul className={styles['list-links']}>
              {configRoutePages.map(
                (page) =>
                  (page.authRequired !== true || hasUser) && (
                    <Link
                      key={page.linkTo}
                      to={page.linkTo}
                      className={clsx({ [styles.active]: page.id === activeRouteId }, styles['nav-link'])}
                    >
                      <li>
                        <Icon name={page.iconName} width="24" height="24" />
                        <span className={styles['link-name']}>{page.textLink}</span>
                      </li>
                    </Link>
                  ),
              )}
            </ul>
            <div className={styles['divider']} />
            <SidebarSubs promoWrpClassName={styles['sign-in-promo-wrp']} keepVisisble={isSidebarOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { MobileSidebar };
