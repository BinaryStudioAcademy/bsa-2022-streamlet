import { FC } from 'common/types/types';
import { useOutsideClick } from 'hooks/hooks';
import { useState, MouseEvent, FormEvent } from 'react';
import { HeaderContainer } from './header-container';
import { MenuOptions, IconName } from 'common/enums/components';

const FAKE_USER_AVATAR = 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745';

const Header: FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { isOpened: isMenuOpen, close, open, ref: menuRef } = useOutsideClick<HTMLDivElement>();

  const options = [
    {
      type: MenuOptions.Settings,
      icon: IconName.SETTINGS,
      onClick: (): void => {
        void 1;
      },
    },
    {
      type: MenuOptions.Theme,
      icon: IconName.MOON,
      onClick: (): void => {
        void 1;
      },
    },
    {
      type: MenuOptions.Logout,
      icon: IconName.LOGOUT,
      onClick: (e: MouseEvent): void => {
        handleClickLogin(e);
      },
    },
  ];

  function handleClickLogin(e: MouseEvent): void {
    e.preventDefault();

    close();
    setIsLogged(!isLogged);
  }

  function handleClickUserMenu(e: MouseEvent): void {
    if (!isMenuOpen) {
      e.preventDefault();
      open();
    }
  }

  function handleInputSearch({ currentTarget }: FormEvent<HTMLInputElement>): void {
    setSearchValue(currentTarget.value);
  }

  return (
    <HeaderContainer
      menuRef={menuRef}
      isLogged={isLogged}
      isMenuOpen={isMenuOpen}
      searchValue={searchValue}
      handleClickUserMenu={handleClickUserMenu}
      handleClickLogin={handleClickLogin}
      handleInputSearch={handleInputSearch}
      userAvatar={FAKE_USER_AVATAR}
      options={options}
    />
  );
};

export { Header };
