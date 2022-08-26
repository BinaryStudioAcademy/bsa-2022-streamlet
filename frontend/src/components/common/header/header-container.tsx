import { MouseEvent, FormEvent } from 'react';
import { FC } from 'common/types/types';
import { MenuOptions, AppRoutes, SearchQueryParam, IconName } from 'common/enums/enums';
import {
  useOutsideClick,
  useAppDispatch,
  useAppSelector,
  useCallback,
  useNavigate,
  useRef,
  useEffect,
  useState,
} from 'hooks/hooks';
import { authActions, searchActions, profileActions } from 'store/actions';
import { NotificationDropdownContainer } from 'components/notification-dropdown/notification-dropdown-container';
import { switchTheme } from 'store/theme-switch/actions';
import { Header } from './header';
import defaultAvatar from 'assets/img/default-user-avatar.jpg';

const HeaderContainer: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: { searchText },
    user,
    profile,
  } = useAppSelector((state) => ({
    search: state.search,
    user: state.auth.user,
    profile: state.profile.profileData,
  }));
  const navigate = useNavigate();

  const hasUser = Boolean(user);
  const isLightTheme = useAppSelector((store) => store.theme.isLightTheme);
  const { isOpened: isMenuOpen, open: openMenu, close: closeMenu, ref: menuRef } = useOutsideClick<HTMLDivElement>();
  const [searchValue, setSearchValue] = useState(searchText);
  const [mobileSearchToggle, setMobileSearchToggle] = useState(false);

  const emptyOnClickHandler = (): void => void 0;

  const handleClickSettings = (): void => {
    navigate(AppRoutes.PROFILE_PREFERENCE, { replace: true });
    closeMenu();
  };

  const matchMenuOptionWithOnClickHandler: Record<MenuOptions, () => void> = {
    [MenuOptions.Settings]: handleClickSettings,
    [MenuOptions.Theme]: emptyOnClickHandler, // should be () => void 0; to work properly
    [MenuOptions.SignOut]: handleClickSignOut,
  };

  useEffect(() => {
    setSearchValue(searchText);
  }, [searchText]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const { id: userId } = user;
    dispatch(profileActions.getProfileByUserId({ userId }));
  }, [dispatch, user]);

  const matchMenuOptionWithIconName: Record<MenuOptions, IconName> = {
    [MenuOptions.Settings]: IconName.SETTINGS,
    [MenuOptions.Theme]: isLightTheme ? IconName.SUN : IconName.MOON,
    [MenuOptions.SignOut]: IconName.SIGN_OUT,
  };

  const matchMenuOptionWithText: Record<MenuOptions, string> = {
    [MenuOptions.Settings]: 'Settings',
    [MenuOptions.Theme]: 'Dark mode',
    [MenuOptions.SignOut]: 'Sign Out',
  };

  const allMenuOptions = [MenuOptions.Settings, MenuOptions.Theme, MenuOptions.SignOut].map((option) => ({
    type: option,
    text: matchMenuOptionWithText[option],
    icon: matchMenuOptionWithIconName[option],
  }));

  const options = allMenuOptions.map((option) => ({
    ...option,
    onClick: matchMenuOptionWithOnClickHandler[option.type],
  }));

  const handleSignOut = useCallback(async () => {
    try {
      await dispatch(authActions.signOut());
    } finally {
      navigate(AppRoutes.ROOT);
    }
  }, [dispatch, navigate]);

  function handleClickSignIn(): void {
    navigate(AppRoutes.SIGN_IN);
  }

  function handleClickSignOut(): void {
    handleSignOut();
    closeMenu();
  }

  function handleClickUserMenu(e: MouseEvent): void {
    if (!isMenuOpen) {
      e.preventDefault();
      openMenu();
    }
  }

  const searchInputEl = useRef<HTMLInputElement>(null);

  const handleClearActiveFilterIds = useCallback(() => dispatch(searchActions.clearActiveFilterIds()), [dispatch]);

  const handleSetInputSearch = useCallback((value: string) => dispatch(searchActions.setSearchText(value)), [dispatch]);

  const handleInputSearch = (value: string): void => setSearchValue(value);

  const handleChangeInputSearch = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
    handleInputSearch(currentTarget.value);
  };

  const setFocusOnSearchInput = (): void => {
    searchInputEl.current?.focus();
  };

  const handleClearInputSearch = (): void => {
    handleInputSearch('');
    setFocusOnSearchInput();
  };

  const handleClickSearchMobileToggle = (): void => {
    if (!mobileSearchToggle) {
      setTimeout(setFocusOnSearchInput, 0);
    }
    setMobileSearchToggle(!mobileSearchToggle);
  };

  const handleClickSearchBtn = (): void => {
    if (searchValue) {
      handleSetInputSearch(searchValue);
      handleClearActiveFilterIds();
      const searchUrlParams = new URLSearchParams({ [SearchQueryParam.SEARCH_TEXT]: searchValue });
      navigate(`${AppRoutes.SEARCH}?${searchUrlParams.toString()}`);
      setMobileSearchToggle(false);
    } else {
      setFocusOnSearchInput();
    }
  };

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleClickSearchBtn();
  };

  const handleThemeToggle = (): void => {
    dispatch(switchTheme());
  };

  return (
    <Header
      menuRef={menuRef}
      isLogged={hasUser}
      isMenuOpen={isMenuOpen}
      searchValue={searchValue}
      searchInputEl={searchInputEl}
      isMobileSearchOpen={mobileSearchToggle}
      handleClickUserMenu={handleClickUserMenu}
      handleClickSignIn={handleClickSignIn}
      handleClickThemeSwitch={handleThemeToggle}
      handleChangeInputSearch={handleChangeInputSearch}
      handleClearInputSearch={handleClearInputSearch}
      handleClickSearchBtn={handleClickSearchBtn}
      handleClickSearchMobileToggle={handleClickSearchMobileToggle}
      handleSubmitSearch={handleSubmitSearch}
      userAvatar={profile?.avatar ? profile.avatar : defaultAvatar}
      userName={profile?.username}
      userEmail={user?.email}
      options={options}
      themeValue={!isLightTheme}
      notificationDropdownContent={<NotificationDropdownContainer />}
    />
  );
};

export { HeaderContainer };
