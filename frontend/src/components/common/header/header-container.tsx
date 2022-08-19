import { FC } from 'common/types/types';
import {
  useOutsideClick,
  useAppDispatch,
  useAppSelector,
  useCallback,
  useNavigate,
  useLocation,
  useId,
} from 'hooks/hooks';
import { useState, MouseEvent, FormEvent } from 'react';
import { Header } from './header';
import { MenuOptions, IconName, AppRoute, SearchQueryParam } from 'common/enums/enums';
import { searchActions } from 'store/actions';

const FAKE_USER_AVATAR = 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745';

const HeaderContainer: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: { searchText },
  } = useAppSelector((state) => ({ search: state.search }));
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isLogged, setIsLogged] = useState(false);
  const { isOpened: isMenuOpen, close: closeMenu, open: openMenu, ref: menuRef } = useOutsideClick<HTMLDivElement>();
  const {
    isOpened: isNotificationsMenuOpen,
    close: closeNotificationsMenu,
    open: openNotificationsMenu,
    ref: notificationsMenuRef,
  } = useOutsideClick<HTMLDivElement>();

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
      type: MenuOptions.SignOut,
      text: 'Log Out',
      icon: IconName.SIGN_OUT,
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

  const searchInputId = useId();

  const handleClearActiveFilterIds = useCallback(() => dispatch(searchActions.clearActiveFilterIds()), [dispatch]);

  const handleInputSearch = useCallback((value: string) => dispatch(searchActions.setSearchText(value)), [dispatch]);

  const handleChangeInputSearch = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
    handleInputSearch(currentTarget.value);
  };

  const handleClearInputSearch = (): void => {
    handleInputSearch('');
    document.getElementById(searchInputId)?.focus();
  };

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchText) {
      handleClearActiveFilterIds();
      const searchUrlParams = new URLSearchParams({ [SearchQueryParam.SEARCH_TEXT]: searchText });
      navigate(`/search?${searchUrlParams.toString()}`, { replace: true });
    }
  };

  if (pathname === AppRoute.SIGN_IN || pathname === AppRoute.SIGN_UP || pathname === AppRoute.RESTORE_PASSWORD) {
    return null;
  }

  return (
    <Header
      menuRef={menuRef}
      isLogged={isLogged}
      isMenuOpen={isMenuOpen}
      searchValue={searchText}
      searchInputId={searchInputId}
      handleClickUserMenu={handleClickUserMenu}
      handleClickLogin={handleClickLogin}
      handleChangeInputSearch={handleChangeInputSearch}
      handleClearInputSearch={handleClearInputSearch}
      handleSubmitSearch={handleSubmitSearch}
      userAvatar={FAKE_USER_AVATAR}
      options={options}
      notificationsMenuRef={notificationsMenuRef}
      handleClickNotificationsMenu={handleClickNotificationsMenu}
      handleCloseNotificationsMenu={handleCloseNotificationsMenu}
      isNotificationsMenuOpen={isNotificationsMenuOpen}
    />
  );
};

export { HeaderContainer };
