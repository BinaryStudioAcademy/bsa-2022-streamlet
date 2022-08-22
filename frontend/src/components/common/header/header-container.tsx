import { MouseEvent, FormEvent } from 'react';
import { FC } from 'common/types/types';
import { MenuOptions, AppRoute, SearchQueryParam } from 'common/enums/enums';
import {
  useOutsideClick,
  useAppDispatch,
  useAppSelector,
  useCallback,
  useNavigate,
  useRef,
  useState,
} from 'hooks/hooks';
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

  const [mobileSearchToggle, setMobileSearchToggle] = useState(false);

  const { isOpened: isMenuOpen, open: openMenu, ref: menuRef } = useOutsideClick<HTMLDivElement>();

  const hasUser = Boolean(user);

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
      navigate(AppRoute.SIGN_IN, { replace: true });
    }
  }, [dispatch, navigate]);

  function handleClickSignIn(): void {
    navigate(AppRoute.SIGN_IN, { replace: true });
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
    if (searchText) {
      handleClearActiveFilterIds();
      const searchUrlParams = new URLSearchParams({ [SearchQueryParam.SEARCH_TEXT]: searchText });
      navigate(`${AppRoute.SEARCH}?${searchUrlParams.toString()}`, { replace: true });
    } else {
      searchInputEl.current?.focus();
    }
  };

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleClickSearchBtn();
  };

  return (
    <Header
      menuRef={menuRef}
      isLogged={hasUser}
      isMenuOpen={isMenuOpen}
      isMobileSearchOpen={mobileSearchToggle}
      searchValue={searchText}
      searchInputEl={searchInputEl}
      handleClickUserMenu={handleClickUserMenu}
      handleClickSignIn={handleClickSignIn}
      handleChangeInputSearch={handleChangeInputSearch}
      handleClearInputSearch={handleClearInputSearch}
      handleClickSearchBtn={handleClickSearchBtn}
      handleClickSearchMobileToggle={handleClickSearchMobileToggle}
      handleSubmitSearch={handleSubmitSearch}
      userAvatar={FAKE_USER_AVATAR}
      options={options}
      notificationDropdownContent={<NotificationDropdownContainer />}
    />
  );
};

export { HeaderContainer };
