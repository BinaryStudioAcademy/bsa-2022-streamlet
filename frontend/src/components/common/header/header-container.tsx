import { FC, NotificationsResponseDto } from 'common/types/types';
import { useOutsideClick } from 'hooks/hooks';
import { useState, MouseEvent, FormEvent } from 'react';
import { Header } from './header';
import { MenuOptions, IconName } from 'common/enums/components';

const FAKE_USER_AVATAR = 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745';

const HeaderContainer: FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { isOpened: isMenuOpen, close: closeMenu, open: openMenu, ref: menuRef } = useOutsideClick<HTMLDivElement>();
  const {
    isOpened: isNotificationsMenuOpen,
    close: closeNotificationsMenu,
    open: openNotificationsMenu,
    ref: notificationsMenuRef,
  } = useOutsideClick<HTMLDivElement>();

  const notifications: NotificationsResponseDto = {
    notifications: [
      {
        'id': '281f1c2f-a54e-435b-a55f-ff868f5a6a5e',
        'videoId': '25391635-8dd2-4298-9943-c79e741ab79b',
        'username': 'boutibridge0',
        'videoName': 'lofi hip hop radio - beats to sleep/chill to',
        'createdAt': new Date('2022-08-10T19:51:32Z'),
        'isViewed': true,
        'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
        'videoPreview': 'http://dummyimage.com/1920x1080.png/ff4444/ffffff',
      },
      {
        'id': '281f1c2f-a546-435b-a55f-ff868f5a6a5e',
        'videoId': '25391635-8dd2-4298-9943-c79e741ab79b',
        'username': 'abambrick1',
        'videoName': '[Valheim] Trying not to die',
        'createdAt': new Date('2022-08-11T22:32:52Z'),
        'isViewed': false,
        'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
        'videoPreview': 'http://dummyimage.com/1920x1080.png/5fa2dd/ffffff',
      },
      {
        'id': '281f1c2f-a54e-445b-a55f-ff868f5a6a5e',
        'videoId': '25391635-8dd2-4298-9943-c79e741ab79b',
        'username': 'clillyman2',
        'videoName': 'Streaming Portal 2 speedrunning until I beat my record',
        'createdAt': new Date('2022-08-10T06:54:40Z'),
        'isViewed': true,
        'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
        'videoPreview': 'http://dummyimage.com/1920x1080.png/5fa2dd/ffffff',
      },
    ],
    total: 3,
  };

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

    closeMenu();
    setIsLogged(!isLogged);
  }

  function handleClickUserMenu(e: MouseEvent): void {
    if (!isMenuOpen) {
      e.preventDefault();
      openMenu();
    }
  }

  function handleClickNotificationsMenu(e: MouseEvent): void {
    if (!isNotificationsMenuOpen) {
      e.preventDefault();
      openNotificationsMenu();
    }
  }

  function handleCloseNotificationsMenu(): void {
    closeNotificationsMenu();
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
      notifications={notifications}
      notificationsMenuRef={notificationsMenuRef}
      handleClickNotificationsMenu={handleClickNotificationsMenu}
      handleCloseNotificationsMenu={handleCloseNotificationsMenu}
      isNotificationsMenuOpen={isNotificationsMenuOpen}
    />
  );
};

export { HeaderContainer };
