import { FC } from 'common/types/types';
import { Icon } from '../icon';
import { IconName } from 'common/enums/components';
import { SubscribeChanel } from './sidebar-container';
import { Chanel } from 'components/sidebar/chanel';
import { Link } from '../common';
import { AppRoute } from 'common/enums/enums';

import styles from './sidebar.module.scss';

interface SidebarProps {
  subscribesList: SubscribeChanel[];
}

type ActiveClass = {
  isActive: boolean;
};

const returnActiveClass = ({ isActive }: ActiveClass): string => (isActive ? styles['active'] : '');

const Sidebar: FC<SidebarProps> = ({ subscribesList }) => (
  <div className={styles.sidebar}>
    <nav className={styles['navigate-menu']}>
      <ul>
        <Link to={AppRoute.ROOT} className={returnActiveClass}>
          <li>
            <Icon name={IconName.HOME} width="24" height="24" />
            <span className={styles['link-name']}>Home</span>
          </li>
        </Link>
        <Link to={AppRoute.BROWSE} className={returnActiveClass}>
          <li>
            <Icon name={IconName.COMPAS} width="24" height="24" />
            <span className={styles['link-name']}>Browse</span>
          </li>
        </Link>
        <Link to={AppRoute.FOLLOWING} className={returnActiveClass}>
          <li>
            <Icon name={IconName.FOLLOW} width="24" height="24" />
            <span className={styles['link-name']}>Following</span>
          </li>
        </Link>
        <Link to={AppRoute.HISTORY} className={returnActiveClass}>
          <li>
            <Icon name={IconName.TIMEAGO} width="24" height="24" />
            <span className={styles['link-name']}>History</span>
          </li>
        </Link>
      </ul>
    </nav>
    <div className={styles['block-subscriptions']}>
      <div className={styles['horizontal-line']}></div>
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
