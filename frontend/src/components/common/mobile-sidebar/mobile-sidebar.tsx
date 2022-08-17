import clsx from 'clsx';
import { IconName } from 'common/enums/components';
import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from '../common';
import { Icon } from '../icon';
import { RoutePage } from '../sidebar/route-pages.config';

import styles from './mobile-sidebar.module.scss';

export interface MobileSidebarProps {
  isSidebarOpen: boolean;
  configRoutePages: RoutePage[];
  activeRouteId: number;
  closeMobileSidebar: () => void;
  component?: FC;
}

const MobileSidebar: FC<MobileSidebarProps> = ({
  isSidebarOpen,
  closeMobileSidebar,
  configRoutePages,
  activeRouteId,
  component: Component,
}) => {
  return (
    <div onClick={closeMobileSidebar} className={clsx({ [styles['open']]: !isSidebarOpen }, styles['mobile-sidebar'])}>
      <div className={styles['sidebar-content']} onClick={(e): void => e.stopPropagation()}>
        <div className={styles['sidebar-header']}>
          <button onClick={closeMobileSidebar} className={styles['burger-menu']}>
            <Icon name={IconName.BURGERMENU} width="30" height="30" />
          </button>
          <Link className={styles['logo-link']} to={AppRoute.ROOT}>
            <Icon name={IconName.LOGOTIP} width="23" height="23" />
            <p className={styles['main-name']}>streamlet</p>
          </Link>
        </div>
        <ul className={styles['list-links']}>
          {configRoutePages.map((page) => (
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
          ))}
        </ul>
        {Component && <Component />}
      </div>
    </div>
  );
};

export { MobileSidebar };
