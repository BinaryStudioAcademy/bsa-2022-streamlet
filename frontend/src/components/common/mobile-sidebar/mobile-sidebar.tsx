import clsx from 'clsx';
import { AppRoutes, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { useNavigate } from 'hooks/hooks';
import { Link, Promo } from '../common';
import { Icon } from '../icon';
import { Logo } from '../logo/logo';
import { RoutePage } from '../sidebar/route-pages.config';

import styles from './mobile-sidebar.module.scss';

export interface MobileSidebarProps {
  isSidebarOpen: boolean;
  isLogged: boolean;
  configRoutePages: RoutePage[];
  activeRouteId: number;
  closeMobileSidebar: () => void;
  component?: FC;
}

const MobileSidebar: FC<MobileSidebarProps> = ({
  isSidebarOpen,
  isLogged,
  closeMobileSidebar,
  configRoutePages,
  activeRouteId,
  component: Component,
}) => {
  const navigate = useNavigate();

  const promoProps = {
    text: 'Sign in to like videos, comment and subscribe.',
    promoWrpClassName: styles['sign-in-promo-wrp'],
    textSpanClassName: styles['sign-in-promo-text'],
    btnTitle: 'Sign in',
    btnClassName: styles['sign-in-promo-btn'],
    btnOnClick: () => navigate(AppRoutes.SIGN_IN),
  };

  return (
    <div className={clsx(styles['shadow'], !isSidebarOpen && styles['shadow-open'])}>
      <div className={styles['scrim']} onClick={closeMobileSidebar}></div>
      <div className={clsx({ [styles['open']]: !isSidebarOpen }, styles['mobile-sidebar'])}>
        <div className={styles['sidebar-content']} onClick={(e): void => e.stopPropagation()}>
          <div className={styles['sidebar-header']}>
            <button onClick={closeMobileSidebar} className={styles['burger-menu']}>
              <Icon name={IconName.BURGER_MENU} width="24" height="24" />
            </button>
            <Logo size={24} />
          </div>
          <div className={styles['sidebar-body']}>
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
            <div className={styles['divider']} />
            {!isLogged && <Promo {...promoProps} />}

            {Component && (
              <>
                <div className={styles['divider']} />
                <Component />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { MobileSidebar };
