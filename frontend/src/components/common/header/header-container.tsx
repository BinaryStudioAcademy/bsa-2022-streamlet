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
import { MouseEvent, FormEvent } from 'react';
import { Header } from './header';
import { MenuOptions, IconName, AppRoute, SearchQueryParam } from 'common/enums/enums';
import { authActions, searchActions } from 'store/actions';

const FAKE_USER_AVATAR = 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745';

const HeaderContainer: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: { searchText },
    user,
  } = useAppSelector((state) => ({
    search: state.search,
    user: state.auth.user,
  }));
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const hasUser = Boolean(user);

  const { isOpened: isMenuOpen, open, ref: menuRef } = useOutsideClick<HTMLDivElement>();

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
      onClick: (): void => {
        handleClickLogout();
      },
    },
  ];

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(authActions.logout());
    } finally {
      navigate(AppRoute.SIGN_IN, { replace: true });
    }
  }, [dispatch, navigate]);

  function handleClickLogin(): void {
    navigate(AppRoute.SIGN_IN, { replace: true });
  }

  function handleClickLogout(): void {
    handleLogout();
  }

  function handleClickUserMenu(e: MouseEvent): void {
    if (!isMenuOpen) {
      e.preventDefault();
      open();
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
      navigate(`${AppRoute.SEARCH}?${searchUrlParams.toString()}`, { replace: true });
    }
  };

  if (pathname === AppRoute.SIGN_IN || pathname === AppRoute.SIGN_UP || pathname === AppRoute.RESTORE_PASSWORD) {
    return null;
  }

  return (
    <Header
      menuRef={menuRef}
      isLogged={hasUser}
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
    />
  );
};

export { HeaderContainer };
