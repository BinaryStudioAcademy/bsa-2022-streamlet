import { FC } from 'common/types/types';
import { NavLink } from 'react-router-dom';
import { Icon } from '../icon';
import { IconName } from 'common/enums/components';

import styles from './sidebar.module.scss';
import { SubscribeChanel } from './sidebar';

interface SidebarProps {
  subscribesList: SubscribeChanel[];
}

const SidebarContainer: FC<SidebarProps> = ({ subscribesList }) => (
  <div className={styles.sidebar}>
    <nav className={styles['navigate-menu']}>
      <ul>
        <NavLink to="/" className={({ isActive }): string => (isActive ? styles['active'] : '')}>
          <li>
            <Icon name={IconName.HOME} width="24" height="24" />
            <span className={styles['link-name']}>Home</span>
          </li>
        </NavLink>
        <NavLink to="/asd" className={({ isActive }): string => (isActive ? styles['active'] : '')}>
          <li>
            <Icon name={IconName.COMPAS} width="24" height="24" />
            <span className={styles['link-name']}>Browse</span>
          </li>
        </NavLink>
        <NavLink to="/12" className={({ isActive }): string => (isActive ? styles['active'] : '')}>
          <li>
            <Icon name={IconName.FOLLOW} width="24" height="24" />
            <span className={styles['link-name']}>Following</span>
          </li>
        </NavLink>
        <NavLink to="/1" className={({ isActive }): string => (isActive ? styles['active'] : '')}>
          <li>
            <Icon name={IconName.TIMEAGO} width="24" height="24" />
            <span className={styles['link-name']}>History</span>
          </li>
        </NavLink>
      </ul>
    </nav>
    <div className={styles['block-subscriptions']}>
      <div className={styles['horizontal-line']}></div>
      <div className={styles['subscription-list']}>
        <p className={styles['subscription-title']}>Subscriptions</p>
        {subscribesList.map((chanel) => (
          <div key={chanel.id} className={styles['subscription-item']}>
            <div style={{ backgroundImage: `url(${chanel.chanelAvatar})` }} className={styles['chanel-avatar']}></div>
            <p className={styles['chanel-name']}>{chanel.title}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export { SidebarContainer };
