import { FormEvent, MouseEvent, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { FC } from 'common/types/types';
import { AppRoutes, IconName, MenuOptions } from 'common/enums/enums';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { closeSidebar, openSidebar } from 'store/layout/actions';
import { Icon } from 'components/common/common';

import styles from './header.module.scss';
import { ToggleSwitch } from '../toggle-switch';
import { Logo } from '../logo/logo';

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
  searchInputEl: RefObject<HTMLInputElement>;
  handleClickUserMenu: (e: MouseEvent<HTMLButtonElement>) => void;
  handleClickThemeSwitch(): void;
  handleClickSignIn(): void;
  handleChangeInputSearch(e: FormEvent<HTMLInputElement>): void;
  handleClearInputSearch(e: MouseEvent<HTMLElement>): void;
  handleSubmitSearch(e: FormEvent<HTMLFormElement>): void;
  options: MenuOption[];
  userAvatar: string;
  userName: string | undefined;
  userEmail: string | undefined;
  menuRef: RefObject<HTMLDivElement>;
  notificationDropdownContent: React.ReactNode;
  themeValue: boolean;
}

const Header: FC<HeaderProps> = ({
  isLogged,
  isMenuOpen,
  searchValue,
  searchInputEl,
  handleClickSignIn,
  handleClickUserMenu,
  handleChangeInputSearch,
  handleClearInputSearch,
  handleSubmitSearch,
  handleClickThemeSwitch,
  options,
  userAvatar,
  userName,
  userEmail,
  menuRef,
  notificationDropdownContent,
  themeValue,
}) => {
  const isSidebarOpen = useAppSelector((state) => state.layout.isOpenSidebar);
  const dispatch = useAppDispatch();

  function handleClickBurgerMenu(): void {
    if (isSidebarOpen) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  }

  return (
    <header className={styles['header']}>
      <div className={styles['logo-block']}>
        <button onClick={handleClickBurgerMenu} className={styles['burger-menu']}>
          <Icon name={IconName.BURGER_MENU} width="24" height="24" />
        </button>
        <Logo size={24} />
      </div>
      <form className={styles['block-search']} onSubmit={handleSubmitSearch}>
        <Icon name={IconName.SEARCH} className={styles['search-icon']} width="24" height="24" />
        <input
          className={styles['search-input']}
          ref={searchInputEl}
          type="text"
          value={searchValue}
          onChange={handleChangeInputSearch}
          placeholder="Search or type"
        />
        <div className={styles['search-input-clear']} aria-label="Clear search" onClick={handleClearInputSearch}>
          <Icon name={IconName.X_MARK} />
        </div>
      </form>
      <div className={styles['control-icons']}>
        <button className={styles['search-mobile']}>
          <Icon name={IconName.SEARCH} className={styles['search-icon']} width="24" height="24" />
        </button>
        {isLogged ? (
          <>
            <Link className={styles['btn-go-stream']} to={AppRoutes.STUDIO}>
              <Icon name={IconName.CAMERA} width="30" height="24" />
            </Link>
            {notificationDropdownContent}
            <button
              onClick={handleClickUserMenu}
              style={{ backgroundImage: `url(${userAvatar})` }}
              className={styles['user-avatar']}
            ></button>
            {isMenuOpen && (
              <div ref={menuRef} className={styles['user-menu']}>
                <div className={styles['user-menu-header']}>
                  <div style={{ backgroundImage: `url(${userAvatar})` }} className={styles['user-menu-avatar']} />
                  <div className={styles['user-menu-info']}>
                    <div className={styles['user-menu-username']}>{userName}</div>
                    <div className={styles['user-menu-email']}>{userEmail}</div>
                  </div>
                </div>
                <div className={styles['horizontal-line']} />
                <ul className={styles['option-list']}>
                  {options.map((option) => (
                    <li key={option.type} className={styles['option']} onClick={option.onClick}>
                      <Icon name={option.icon} />
                      <span>{option.text}</span>
                      {option.type === MenuOptions.Theme && (
                        <ToggleSwitch defaultValue={themeValue} onToggle={handleClickThemeSwitch} />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <button onClick={handleClickSignIn} className={styles['sign-in-btn']}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export { Header };
