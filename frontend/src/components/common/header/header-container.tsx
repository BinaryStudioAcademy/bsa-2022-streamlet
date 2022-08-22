import { MouseEvent, FormEvent } from 'react';
import { FC } from 'common/types/types';
import { MenuOptions, AppRoutes, SearchQueryParam } from 'common/enums/enums';
import { useOutsideClick, useAppDispatch, useAppSelector, useCallback, useNavigate, useRef } from 'hooks/hooks';
import { authActions, searchActions } from 'store/actions';
import { NotificationDropdownContainer } from 'components/notification-dropdown/notification-dropdown-container';
import { allMenuOptions } from './config';
import { Header } from './header';

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

  const hasUser = Boolean(user);

  const { isOpened: isMenuOpen, open: openMenu, ref: menuRef } = useOutsideClick<HTMLDivElement>();

  const emptyOnClickHandler = (): void => void 0;

  const matchMenuOptionWithOnClickHandler: Record<MenuOptions, () => void> = {
    [MenuOptions.Settings]: emptyOnClickHandler,
    [MenuOptions.Theme]: emptyOnClickHandler,
    [MenuOptions.SignOut]: handleClickSignOut,
  };

  const options = allMenuOptions.map((option) => ({
    ...option,
    onClick: matchMenuOptionWithOnClickHandler[option.type],
  }));

  const handleSignOut = useCallback(async () => {
    try {
      await dispatch(authActions.signOut());
    } finally {
      navigate(AppRoutes.SIGN_IN, { replace: true });
    }
  }, [dispatch, navigate]);

  function handleClickSignIn(): void {
    navigate(AppRoutes.SIGN_IN, { replace: true });
  }

  function handleClickSignOut(): void {
    handleSignOut();
  }

  function handleClickUserMenu(e: MouseEvent): void {
    if (!isMenuOpen) {
      e.preventDefault();
      openMenu();
    }
  }

  const searchInputEl = useRef<HTMLInputElement>(null);

  const handleClearActiveFilterIds = useCallback(() => dispatch(searchActions.clearActiveFilterIds()), [dispatch]);

  const handleInputSearch = useCallback((value: string) => dispatch(searchActions.setSearchText(value)), [dispatch]);

  const handleChangeInputSearch = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
    handleInputSearch(currentTarget.value);
  };

  const handleClearInputSearch = (): void => {
    handleInputSearch('');
    searchInputEl.current?.focus();
  };

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchText) {
      handleClearActiveFilterIds();
      const searchUrlParams = new URLSearchParams({ [SearchQueryParam.SEARCH_TEXT]: searchText });
      navigate(`${AppRoutes.SEARCH}?${searchUrlParams.toString()}`, { replace: true });
    }
  };

  return (
    <Header
      menuRef={menuRef}
      isLogged={hasUser}
      isMenuOpen={isMenuOpen}
      searchValue={searchText}
      searchInputEl={searchInputEl}
      handleClickUserMenu={handleClickUserMenu}
      handleClickSignIn={handleClickSignIn}
      handleChangeInputSearch={handleChangeInputSearch}
      handleClearInputSearch={handleClearInputSearch}
      handleSubmitSearch={handleSubmitSearch}
      userAvatar={FAKE_USER_AVATAR}
      options={options}
      notificationDropdownContent={<NotificationDropdownContainer />}
    />
  );
};

export { HeaderContainer };
