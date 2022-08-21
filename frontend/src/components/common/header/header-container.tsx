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
import { MenuOptions, ThemeMenuOptions, IconName, AppRoute, SearchQueryParam } from 'common/enums/enums';
import { searchActions } from 'store/actions';
import { switchDark, switchLight } from 'store/theme-switch/actions';
import { NotificationDropdownContainer } from 'components/notification-dropdown/notification-dropdown-container';

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
    isOpened: isTHemeMenuOpen,
    close: themeMenuClose,
    open: themeMenuOpen,
    ref: themeMenuRef,
  } = useOutsideClick<HTMLDivElement>();

  const isLightTheme = useAppSelector((store) => store.theme.isLightTheme);

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
      icon: isLightTheme ? IconName.SUN : IconName.MOON,
      onClick: (e: MouseEvent): void => {
        handleClickTheme(e);
      },
    },
    {
      type: MenuOptions.SignOut,
      text: 'Sign Out',
      icon: IconName.SIGN_OUT,
      onClick: (e: MouseEvent): void => {
        handleClickSignIn(e);
      },
    },
  ];

  const themeOptions = [
    {
      type: ThemeMenuOptions.BACK,
      text: '',
      icon: IconName.ARROW_UP,
      onClick: (e: MouseEvent): void => {
        handleCLickBack(e);
      },
    },
    {
      type: ThemeMenuOptions.LIGHT_THEME,
      text: 'Light theme',
      icon: IconName.SUN,
      onClick: (e: MouseEvent): void => {
        handleClickLightTheme(e);
      },
    },
    {
      type: ThemeMenuOptions.DARK_THEME,
      text: 'Dark theme',
      icon: IconName.MOON,
      onClick: (e: MouseEvent): void => {
        handleClickDarkTheme(e);
      },
    },
  ];
  function handleClickSignIn(e: MouseEvent): void {
    e.preventDefault();

    closeMenu();
    setIsLogged(!isLogged);
  }

  function handleClickTheme(e: MouseEvent): void {
    if (!isTHemeMenuOpen) {
      e.preventDefault();
      themeMenuOpen();
      closeMenu();
    }
  }

  function handleCLickBack(e: MouseEvent): void {
    e.preventDefault();
    themeMenuClose();
    openMenu();
  }

  function handleClickDarkTheme(e: MouseEvent): void {
    e.preventDefault();
    dispatch(switchDark());
    themeMenuClose();
    openMenu();
  }

  function handleClickLightTheme(e: MouseEvent): void {
    e.preventDefault();
    dispatch(switchLight());
    themeMenuClose();
    openMenu();
  }

  function handleClickUserMenu(e: MouseEvent): void {
    if (!isMenuOpen) {
      e.preventDefault();
      openMenu();
    }
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
      themeMenuRef={themeMenuRef}
      isLogged={isLogged}
      isMenuOpen={isMenuOpen}
      isThemeMenuOpen={isTHemeMenuOpen}
      searchValue={searchText}
      searchInputId={searchInputId}
      handleClickUserMenu={handleClickUserMenu}
      handleClickSignIn={handleClickSignIn}
      handleChangeInputSearch={handleChangeInputSearch}
      handleClearInputSearch={handleClearInputSearch}
      handleSubmitSearch={handleSubmitSearch}
      userAvatar={FAKE_USER_AVATAR}
      options={options}
      themeOptions={themeOptions}
      notificationDropdownContent={<NotificationDropdownContainer />}
    />
  );
};

export { HeaderContainer };
