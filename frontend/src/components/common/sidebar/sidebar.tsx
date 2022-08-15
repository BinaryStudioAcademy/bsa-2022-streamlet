import { FC } from 'common/types/types';
import { Icon } from '../icon';
import { SubscribeChanel } from 'common/types/sidebar/subscribe-chanel';
import { Chanel } from 'components/sidebar/chanel';
import { Link } from '../common';
import { RoutePage } from './route-pages.config';
import clsx from 'clsx';

import styles from './sidebar.module.scss';

interface SidebarProps {
  subscribesList: SubscribeChanel[];
  configRoutePages: RoutePage[];
  activeRouteId: number;
}

const Sidebar: FC<SidebarProps> = ({ subscribesList, configRoutePages, activeRouteId }) => (
  <div className={styles.sidebar}>
    <nav className={styles['navigate-menu']}>
      <ul>
        {configRoutePages.map((page) => (
          <Link key={page.linkTo} to={page.linkTo} className={clsx({ [styles.active]: page.id === activeRouteId })}>
            <li>
              <Icon name={page.IconName} width="24" height="24" />
              <span className={styles['link-name']}>{page.textLink}</span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
    <div className={styles['block-subscriptions']}>
      <div className={styles['horizontal-line']} />
      <div className={styles['subscription-list']}>
        <p className={styles['subscription-title']}>Subscriptions</p>
        {subscribesList.map((chanel) => (
          <Chanel key={chanel.id} chanelInfo={chanel} />
        ))}
      </div>
    </div>
  </div>
);

export { Sidebar };
