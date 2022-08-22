import { FormEvent, MouseEvent, RefObject } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FC } from 'common/types/types';
import { AppRoute, IconName, MenuOptions } from 'common/enums/enums';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { closeSidebar, openSidebar } from 'store/layout/actions';
import { Icon } from 'components/common/common';

import styles from './header.module.scss';

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
  isMobileSearchOpen: boolean;
  handleClickUserMenu: (e: MouseEvent<HTMLButtonElement>) => void;
  handleClickSignIn(): void;
  handleChangeInputSearch(e: FormEvent<HTMLInputElement>): void;
  handleClearInputSearch(e: MouseEvent<HTMLElement>): void;
  handleClickSearchBtn(e: MouseEvent<HTMLElement>): void;
  handleClickSearchMobileToggle(): void;
  handleSubmitSearch(e: FormEvent<HTMLFormElement>): void;
  options: MenuOption[];
  userAvatar: string;
  menuRef: RefObject<HTMLDivElement>;
  notificationDropdownContent: React.ReactNode;
}

const Header: FC<HeaderProps> = ({
  isLogged,
  isMenuOpen,
  searchValue,
  searchInputEl,
  isMobileSearchOpen,
  handleClickSignIn,
  handleClickUserMenu,
  handleChangeInputSearch,
  handleClearInputSearch,
  handleClickSearchBtn,
  handleClickSearchMobileToggle,
  handleSubmitSearch,
  options,
  userAvatar,
  menuRef,
  notificationDropdownContent,
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
      <div className={styles['wrapper-first-part']}>
        <div className={styles['logo-block']}>
          <button onClick={handleClickBurgerMenu} className={styles['burger-menu']}>
            <Icon name={IconName.BURGER_MENU} width="30" height="30" />
          </button>
          <Link className={styles['logo-link']} to={AppRoute.ROOT}>
            <Icon name={IconName.MAIN_LOGO} width="23" height="23" />
            <p className={styles['main-name']}>streamlet</p>
          </Link>
        </div>
        <form
          className={clsx(styles['block-search'], isMobileSearchOpen && styles['block-search-mobile'])}
          onSubmit={handleSubmitSearch}
        >
          <div className={styles['back-btn-mobile']} onClick={handleClickSearchMobileToggle}>
            <Icon name={IconName.ARROW_LEFT} className={styles['search-icon']} />
          </div>
          <div className={styles['block-search-input']}>
            <div className={styles['search-btn']} onClick={handleClickSearchBtn}>
              <Icon name={IconName.SEARCH} className={styles['search-icon']} />
            </div>
            <input
              className={styles['search-input']}
              ref={searchInputEl}
              type="text"
              value={searchValue}
              onChange={handleChangeInputSearch}
              placeholder="Search or type"
              autoComplete="off"
            />
            <div className={styles['search-input-clear']} aria-label="Clear search" onClick={handleClearInputSearch}>
              <Icon name={IconName.X_MARK} />
            </div>
          </div>
          <div className={styles['search-btn-mobile']} onClick={handleClickSearchBtn}>
            <Icon name={IconName.SEARCH} className={styles['search-icon']} />
          </div>
        </form>
      </div>
      <div className={styles['block-user']}>
        {!isLogged && (
          <>
            <button className={styles['search-mobile']} onClick={handleClickSearchMobileToggle}>
              <Icon name={IconName.SEARCH} className={styles['search-icon']} />
            </button>
            <button onClick={handleClickSignIn} className={styles['sign-in-btn']}>
              Sign In
            </button>
          </>
        )}
        {isLogged && (
          <div className={styles['block-auth-user']}>
            <button className={styles['search-mobile']} onClick={handleClickSearchMobileToggle}>
              <Icon name={IconName.SEARCH} className={styles['search-icon']} width="24" height="24" />
            </button>
            <div className={styles['control-icons']}>
              <button className={styles['btn-go-stream']}>
                <Icon name={IconName.CAMERA} width="30" height="24" />
              </button>
              {notificationDropdownContent}
            </div>
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
