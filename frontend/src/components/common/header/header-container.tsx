import { FC } from 'common/types/types';
import {
  useOutsideClick,
  useAppDispatch,
  useAppSelector,
  useCallback,
  useNavigate,
  useLocation,
  useId,
  useEffect,
} from 'hooks/hooks';
import { useState, MouseEvent, FormEvent } from 'react';
import { Header } from './header';
import { MenuOptions, IconName, AppRoute, SearchQueryParam } from 'common/enums/enums';
import { searchActions, profileActions } from 'store/actions';
import { NotificationDropdownContainer } from 'components/notification-dropdown/notification-dropdown-container';
import defaultAvatar from '../../../assets/img/default-user-avatar.jpg';

const HeaderContainer: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: { searchText },
  } = useAppSelector((state) => ({ search: state.search }));
  const user = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector((state) => state.profile.profileData);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isLogged, setIsLogged] = useState(false);
  const { isOpened: isMenuOpen, close: closeMenu, open: openMenu, ref: menuRef } = useOutsideClick<HTMLDivElement>();

  useEffect(() => {
    if (!isLogged || !user) {
      return;
    }
    const { id: userId } = user;
    dispatch(profileActions.getProfileByUserId({ userId }));
  }, [dispatch, isLogged, user]);

  const options = [
    {
      type: MenuOptions.Settings,
      text: 'Profile settings',
      icon: IconName.SETTINGS,
      onClick: (): void => {
        navigate(AppRoute.PROFILE_PREFERENCE, { replace: true });
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
      text: 'Sign Out',
      icon: IconName.SIGN_OUT,
      onClick: (e: MouseEvent): void => {
        handleClickSignIn(e);
      },
    },
  ];

  function handleClickSignIn(e: MouseEvent): void {
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
      handleClickSignIn={handleClickSignIn}
      handleChangeInputSearch={handleChangeInputSearch}
      handleClearInputSearch={handleClearInputSearch}
      handleSubmitSearch={handleSubmitSearch}
      userAvatar={profile?.avatar ? profile?.avatar : defaultAvatar}
      options={options}
      notificationDropdownContent={<NotificationDropdownContainer />}
    />
  );
};

export { HeaderContainer };
