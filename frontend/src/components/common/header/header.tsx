import { FC } from 'common/types/types';
import { Link } from 'react-router-dom';
import { FormEvent, MouseEvent, RefObject } from 'react';
import { AppRoute, IconName } from 'common/enums/enums';
import { MenuOptions } from 'common/enums/components/';
import { Icon } from '../icon';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';

import styles from './header.module.scss';
import { closeSidebar, openSidebar } from 'store/layout/actions';

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
  handleClickLogin(): void;
  handleChangeInputSearch(e: FormEvent<HTMLInputElement>): void;
  handleClearInputSearch(e: MouseEvent<HTMLElement>): void;
  handleSubmitSearch(e: FormEvent<HTMLFormElement>): void;
  options: MenuOption[];
  userAvatar: string;
  menuRef: RefObject<HTMLDivElement>;
}

const Header: FC<HeaderProps> = ({
  isLogged,
  isMenuOpen,
  searchValue,
  searchInputEl,
  handleClickLogin,
  handleClickUserMenu,
  handleChangeInputSearch,
  handleClearInputSearch,
  handleSubmitSearch,
  options,
  userAvatar,
  menuRef,
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
            <Icon name={IconName.BURGERMENU} width="30" height="30" />
          </button>
          <Link className={styles['logo-link']} to={AppRoute.ROOT}>
            <Icon name={IconName.LOGOTIP} width="23" height="23" />
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
            <Icon name={IconName.XMARK} />
          </div>
        </form>
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
            <button className={styles['btn-notification']}>
              <Icon name={IconName.BELL} width="24" height="27" />
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
