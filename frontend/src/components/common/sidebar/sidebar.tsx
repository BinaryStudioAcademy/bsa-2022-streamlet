import clsx from 'clsx';
import { FC } from 'common/types/types';
import { Icon } from '../icon';
import { Link } from '../common';
import { RoutePage } from './route-pages.config';
import { MobileSidebar, MobileSidebarProps } from '../mobile-sidebar/mobile-sidebar';

import styles from './sidebar.module.scss';
import { SidebarSubs } from './sidebar-subs/sidebar-subs';

interface SidebarProps {
  isSidebarOpen: boolean;
  configRoutePages: RoutePage[];
  activeRouteId: number;
  mobileSidebarProps: MobileSidebarProps;
}

const Sidebar: FC<SidebarProps> = ({ configRoutePages, activeRouteId, isSidebarOpen, mobileSidebarProps }) => {
  return (
    <>
      <MobileSidebar {...mobileSidebarProps} />
      <div className={clsx({ [styles.close]: !isSidebarOpen }, styles.sidebar)}>
        <nav className={styles['navigate-menu']}>
          <ul>
            {configRoutePages.map((page) => (
              <Link key={page.linkTo} to={page.linkTo} className={clsx({ [styles.active]: page.id === activeRouteId })}>
                <li>
                  <Icon name={page.iconName} width="24" height="24" />
                  <span className={styles['link-name']}>{page.textLink}</span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        <div className={styles['divider']} />
        <SidebarSubs className={styles['block-subscription']} promoWrpClassName={styles['sign-in-promo-wrp']} />
      </div>
    </>
  );
};

export { Sidebar };
