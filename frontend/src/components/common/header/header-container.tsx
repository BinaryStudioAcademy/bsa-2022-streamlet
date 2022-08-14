import { FC } from 'common/types/types';
import { useOutsideClick } from 'hooks/hooks';
import { useState, MouseEvent, FormEvent } from 'react';
import { Header } from './header';
import { MenuOptions, IconName } from 'common/enums/components';

const FAKE_USER_AVATAR = 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745';

const HeaderContainer: FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { isOpened: isMenuOpen, close, open, ref: menuRef } = useOutsideClick<HTMLDivElement>();

  const options = [
    {
      type: MenuOptions.Settings,
      text: 'Settings',
      icon: IconName.SETTINGS,
      onClick: (): void => {
        void 1;
      },
    },
    {
      type: MenuOptions.Theme,
      text: 'Theme',
      icon: IconName.MOON,
      onClick: (): void => {
        void 1;
      },
    },
    {
      type: MenuOptions.Logout,
      text: 'Log Out',
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
    <Header
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

export { HeaderContainer };
