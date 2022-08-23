import { FormEvent, MouseEvent, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { FC } from 'common/types/types';
import { AppRoutes, IconName, MenuOptions } from 'common/enums/enums';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { closeSidebar, openSidebar } from 'store/layout/actions';
import { Icon } from 'components/common/common';

import styles from './header.module.scss';
import { ToggleSwitch } from '../toggle-switch';

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
  handleClickGoToStream(): void;
  handleClickThemeSwitch(): void;
  handleClickSignIn(): void;
  handleChangeInputSearch(e: FormEvent<HTMLInputElement>): void;
  handleClearInputSearch(e: MouseEvent<HTMLElement>): void;
  handleSubmitSearch(e: FormEvent<HTMLFormElement>): void;
  options: MenuOption[];
  userAvatar: string;
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
  handleClickGoToStream,
  handleChangeInputSearch,
  handleClearInputSearch,
  handleSubmitSearch,
  handleClickThemeSwitch,
  options,
  userAvatar,
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
        <Link className={styles['logo-link']} to={AppRoutes.ROOT}>
          <Icon name={IconName.MAIN_LOGO} width="26" height="26" />
          <p className={styles['main-name']}>streamlet</p>
        </Link>
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
            <button className={styles['btn-go-stream']} onClick={handleClickGoToStream}>
              <Icon name={IconName.CAMERA} width="30" height="24" />
            </button>
            {notificationDropdownContent}
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
