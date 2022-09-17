import { FormEvent, MouseEvent, RefObject } from 'react';
import clsx from 'clsx';
import { FC } from 'common/types/types';
import { IconName, MenuOptions } from 'common/enums/enums';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { closeSidebar, openSidebar } from 'store/layout/actions';
import { Icon } from 'components/common/common';

import styles from './header.module.scss';
import { ToggleSwitch } from '../toggle-switch';
import { Logo } from '../logo/logo';
import { UserAvatarOrInitials } from '../user-avatar-or-initials/user-avatar-or-initials';

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
  handleClickThemeSwitch(): void;
  handleClickSignIn(): void;
  handleChangeInputSearch(e: FormEvent<HTMLInputElement>): void;
  handleClearInputSearch(e: MouseEvent<HTMLElement>): void;
  handleClickSearchBtn(e: MouseEvent<HTMLElement>): void;
  handleClickSearchMobileToggle(): void;
  handleSubmitSearch(e: FormEvent<HTMLFormElement>): void;
  handleClickStudio(): void;
  options: MenuOption[];
  userAvatar: string | undefined;
  userName: string | undefined;
  userFirstName: string | undefined;
  userLastName: string | undefined;
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
  isMobileSearchOpen,
  handleClickSignIn,
  handleClickUserMenu,
  handleChangeInputSearch,
  handleClearInputSearch,
  handleClickSearchBtn,
  handleClickSearchMobileToggle,
  handleSubmitSearch,
  handleClickThemeSwitch,
  handleClickStudio,
  options,
  userAvatar,
  userName,
  userFirstName,
  userLastName,
  userEmail,
  menuRef,
  // notificationDropdownContent,
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
        <Logo size={24} className={styles['logo-desktop']} />
        <Logo size={24} isMobile={true} className={styles['logo-mobile']} />
      </div>
      <form
        className={clsx(styles['block-search'], isMobileSearchOpen && styles['block-search-mobile'])}
        onSubmit={handleSubmitSearch}
      >
        <div className={styles['back-btn-mobile']} onClick={handleClickSearchMobileToggle}>
          <Icon name={IconName.ARROW_LEFT} className={styles['search-icon']} width="24" height="24" />
        </div>
        <div className={styles['block-search-input']}>
          <div className={styles['search-btn']} onClick={handleClickSearchBtn}>
            <Icon name={IconName.SEARCH} className={styles['search-icon']} width="24" height="24" />
          </div>
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
        </div>
        <div className={styles['search-btn-mobile']} onClick={handleClickSearchBtn}>
          <Icon name={IconName.SEARCH} className={styles['search-icon']} width="24" height="24" />
        </div>
      </form>
      <div className={styles['control-icons']}>
        <button className={styles['search-mobile']} onClick={handleClickSearchMobileToggle}>
          <Icon name={IconName.SEARCH} className={styles['search-icon']} width="24" height="24" />
        </button>
        {isLogged ? (
          <>
            <div
              data-tip="Start stream"
              data-place="bottom"
              className={styles['btn-go-stream']}
              onClick={handleClickStudio}
            >
              <Icon name={IconName.CAMERA} width="24" height="22" />
            </div>
            {/* {notificationDropdownContent} */}
            <button
              data-tip={'User profile'}
              data-place="bottom"
              onClick={handleClickUserMenu}
              className={styles['user-avatar']}
            >
              <UserAvatarOrInitials
                className={styles['user-avatar-default']}
                avatar={userAvatar}
                userNamingInfo={{ firstName: userFirstName, lastName: userLastName, userName: userName ?? '' }}
              />
            </button>
            {isMenuOpen && (
              <div ref={menuRef} className={styles['user-menu']}>
                <div className={styles['user-menu-header']}>
                  <UserAvatarOrInitials
                    className={styles['user-menu-avatar']}
                    avatar={userAvatar}
                    userNamingInfo={{ firstName: userFirstName, lastName: userLastName, userName: userName ?? '' }}
                  />
                  <div className={styles['user-menu-info']}>
                    <div className={styles['user-menu-username']}>{userName}</div>
                    <div className={styles['user-menu-email']}>{userEmail}</div>
                  </div>
                </div>
                <div className={styles['horizontal-line']} />
                <ul className={styles['option-list']}>
                  {options.map((option) => (
                    <li key={option.type} className={styles['option']} onClick={option.onClick}>
                      <div className={styles['option-segment']}>
                        <Icon name={option.icon} />
                        <span>{option.text}</span>
                      </div>
                      {option.type === MenuOptions.Theme && (
                        <div className={styles['option-segment']}>
                          <ToggleSwitch defaultValue={themeValue} onToggle={handleClickThemeSwitch} />
                        </div>
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
