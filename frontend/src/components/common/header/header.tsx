import { FC, NotificationsResponseDto } from 'common/types/types';
import { Link } from 'react-router-dom';
import { FormEvent, MouseEvent, RefObject } from 'react';
import { AppRoute, IconName } from 'common/enums/enums';
import { IconColor, MenuOptions } from 'common/enums/components';
import { Icon } from '../icon';

import styles from './header.module.scss';
import { NotificationDropdown } from 'components/notification-dropdown/notification-dropdown';

interface MenuOption {
  type: MenuOptions;
  text: string;
  icon: string;
  onClick?: (e: MouseEvent) => void;
}

interface HeaderProps {
  isLogged: boolean;
  isMenuOpen: boolean;
  searchValue: string;
  handleClickUserMenu: (e: MouseEvent<HTMLButtonElement>) => void;
  handleClickNotificationsMenu: (e: MouseEvent<HTMLButtonElement>) => void;
  handleCloseNotificationsMenu: () => void;
  handleClickLogin(e: MouseEvent<HTMLElement>): void;
  handleInputSearch(e: FormEvent<HTMLInputElement>): void;
  options: MenuOption[];
  userAvatar: string;
  menuRef: RefObject<HTMLDivElement>;
  notificationsMenuRef: RefObject<HTMLDivElement>;
  notifications: NotificationsResponseDto;
  isNotificationsMenuOpen: boolean;
}

const Header: FC<HeaderProps> = ({
  isLogged,
  isMenuOpen,
  searchValue,
  handleClickLogin,
  handleClickUserMenu,
  handleClickNotificationsMenu,
  handleCloseNotificationsMenu,
  handleInputSearch,
  options,
  userAvatar,
  menuRef,
  notificationsMenuRef,
  notifications,
  isNotificationsMenuOpen,
}) => {
  const haveUnreadNotifications = notifications.notifications.some((notification) => !notification.isViewed);

  return (
    <header className={styles['header']}>
      <div className={styles['wrapper-first-part']}>
        <div className={styles['logo-block']}>
          <button className={styles['burger-menu']}>
            <Icon name={IconName.BURGERMENU} width="30" height="30" />
          </button>
          <Link className={styles['logo-link']} to={AppRoute.ROOT}>
            <Icon name={IconName.LOGOTIP} width="23" height="23" />
            <p className={styles['main-name']}>streamlet</p>
          </Link>
        </div>
        <div className={styles['block-search']}>
          <Icon name={IconName.SEARCH} className={styles['search-icon']} width="24" height="24" />
          <input
            className={styles['search-input']}
            type="text"
            value={searchValue}
            onChange={handleInputSearch}
            placeholder="Search or type"
          />
        </div>
      </div>
      <div className={styles['block-user']}>
        {!isLogged && (
          <>
            <button className={styles['search-mobile']}>
              <Icon name={IconName.SEARCH} className={styles['search-icon']} width="24" height="24" />
            </button>
            <button onClick={handleClickLogin} className={styles['sign-in-btn']}>
              Sign In
            </button>
          </>
        )}
        {isLogged && (
          <div className={styles['block-auth-user']}>
            <button className={styles['search-mobile']}>
              <Icon name={IconName.SEARCH} className={styles['search-icon']} width="24" height="24" />
            </button>
            <button className={styles['btn-go-stream']}>
              <Icon name={IconName.CAMERA} width="30" height="24" />
            </button>
            <button className={styles['btn-notification']} onClick={handleClickNotificationsMenu}>
              <>
                <Icon color={IconColor.GRAY} name={IconName.ALARM} width="24" height="27" />
                {haveUnreadNotifications && <div className={styles['unread-mark']}></div>}
                {isNotificationsMenuOpen && (
                  <div
                    ref={notificationsMenuRef}
                    className={`${styles['notifications-wrapper']} ${
                      isNotificationsMenuOpen && styles['notifications-dropdown-open']
                    }`}
                  >
                    <NotificationDropdown notifications={notifications} onClose={handleCloseNotificationsMenu} />
                  </div>
                )}
              </>
            </button>
            <button
              onClick={handleClickUserMenu}
              style={{ backgroundImage: `url(${userAvatar})` }}
              className={styles['user-avatar']}
            ></button>
            {isMenuOpen && (
              <div ref={menuRef} className={styles['user-menu']}>
                <ul className={styles['option-list']}>
                  {options.map((option) => (
                    <li key={option.type} className={styles['option']} onClick={option.onClick}>
                      <Icon name={option.icon} />
                      <span>{option.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };
